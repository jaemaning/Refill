package com.refill.account.client;

import com.refill.account.dto.request.LoginIdFindRequest;
import com.refill.account.dto.request.LoginPasswordRequest;
import com.refill.account.dto.request.LoginRequest;
import com.refill.account.dto.response.TokenResponse;
import com.refill.account.entity.ClientType;
import com.refill.account.util.AccountUtil;
import com.refill.global.entity.Message;
import com.refill.global.entity.Role;
import com.refill.global.exception.ErrorCode;
import com.refill.global.service.AmazonSESService;
import com.refill.hospital.entity.Hospital;
import com.refill.hospital.service.HospitalService;
import com.refill.member.exception.MemberException;
import com.refill.security.util.JwtProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

@Slf4j
@RequiredArgsConstructor
@Component
public class HospitalClient implements Client{

    private final HospitalService hospitalService;
    private final BCryptPasswordEncoder passwordEncoder;
    private final JwtProvider jwtProvider;
    private final AmazonSESService amazonSESService;
    @Value("${jwt.token.secret}") private String secretKey;

    @Override
    public ClientType getClientType() {
        return ClientType.HOSPITAL;
    }

    @Override
    public TokenResponse login(LoginRequest loginRequest) {
        Hospital hospital = hospitalService.findByLoginId(loginRequest.loginId());

        // 1. id가 없는 경우는 findByLoginId 에서 처리
        // 2. 패스워드가 일치하지 않음

        if (!passwordEncoder.matches(loginRequest.loginPassword(),
            hospital.getLoginPassword())) {
            throw new MemberException(ErrorCode.INVALID_PASSWORD);
        }

        // 3. 승인 대기중인 병원임
        if (hospital.getRole() == Role.ROLE_GUEST) {
            throw new MemberException(ErrorCode.OUTSTANDING_AUTHORIZATION);
        }

        String accessToken = jwtProvider.createToken(hospital.getId(), hospital.getLoginId(), hospital.getRole(), secretKey);
        String refreshToken = jwtProvider.createRefreshToken(hospital.getLoginId(), hospital.getRole(), secretKey);

        return new TokenResponse(hospital.getId(), accessToken, refreshToken);
    }

    @Override
    public String findLoginId(LoginIdFindRequest loginIdFindRequest) {
        Hospital hospital = hospitalService.findByEmail(loginIdFindRequest.email());
        amazonSESService.sendLoginId(hospital.getEmail(), hospital.getLoginId());

        return Message.FIND_LOGIN_ID.getMessage();
    }

    @Override
    public String findPassword(LoginPasswordRequest loginPasswordRequest) {
        Hospital hospital = hospitalService.findByLoginIdAndEmail(loginPasswordRequest.loginId(),
            loginPasswordRequest.email());
        String newPassword = AccountUtil.getRandomCode(10);
        amazonSESService.sendTempPassword(loginPasswordRequest.email(), newPassword);
        hospital.encodePassword(passwordEncoder.encode(newPassword));

        return Message.FIND_PASSWORD.getMessage();
    }
}
