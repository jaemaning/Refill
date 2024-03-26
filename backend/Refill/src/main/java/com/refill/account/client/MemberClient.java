package com.refill.account.client;

import com.refill.account.dto.request.LoginIdFindRequest;
import com.refill.account.dto.request.LoginPasswordRequest;
import com.refill.account.dto.request.LoginRequest;
import com.refill.account.dto.response.TokenResponse;
import com.refill.account.entity.ClientType;
import com.refill.account.util.AccountUtil;
import com.refill.global.entity.Message;
import com.refill.global.exception.ErrorCode;
import com.refill.global.service.AmazonSESService;
import com.refill.member.entity.Member;
import com.refill.member.exception.MemberException;
import com.refill.member.service.MemberService;
import com.refill.security.util.JwtProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

@Slf4j
@RequiredArgsConstructor
@Component
public class MemberClient implements Client{

    private final MemberService memberService;
    private final BCryptPasswordEncoder passwordEncoder;
    private final JwtProvider jwtProvider;
    private final AmazonSESService amazonSESService;
    @Value("${jwt.token.secret}") private String secretKey;

    @Override
    public ClientType getClientType() {
        return ClientType.MEMBER;
    }

    @Override
    public TokenResponse login(LoginRequest loginRequest) {
        Member member = memberService.findByLoginId(loginRequest.loginId());

        if (!passwordEncoder.matches(loginRequest.loginPassword(),
            member.getLoginPassword())) {
            throw new MemberException(ErrorCode.INVALID_PASSWORD);
        }

        String accessToken = jwtProvider.createToken(member.getId(), member.getLoginId(), member.getRole(), secretKey);
        String refreshToken = jwtProvider.createRefreshToken(member.getLoginId(), member.getRole(), secretKey);

        return new TokenResponse(member.getId(), accessToken, refreshToken);
    }

    @Override
    public String findLoginId(LoginIdFindRequest loginIdFindRequest) {
        Member member = memberService.findByEmail(loginIdFindRequest.email());
        amazonSESService.sendLoginId(member.getEmail(), member.getLoginId());

        return Message.FIND_LOGIN_ID.getMessage();
    }

    @Override
    public String findPassword(LoginPasswordRequest loginPasswordRequest) {
        Member member = memberService.findByLoginIdAndEmail(loginPasswordRequest.loginId(),
            loginPasswordRequest.email());
        String newPassword = AccountUtil.getRandomCode(10);
        amazonSESService.sendTempPassword(loginPasswordRequest.email(), newPassword);
        member.encodePassword(passwordEncoder.encode(newPassword));

        return Message.FIND_PASSWORD.getMessage();
    }
}
