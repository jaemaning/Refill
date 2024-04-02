package com.refill.account.service;

import com.refill.account.client.AccountClientComposite;
import com.refill.account.dto.request.EmailVerifyRequest;
import com.refill.account.dto.request.HospitalJoinRequest;
import com.refill.account.dto.request.LoginIdFindRequest;
import com.refill.account.dto.request.LoginPasswordRequest;
import com.refill.account.dto.request.LoginRequest;
import com.refill.account.dto.request.MemberJoinRequest;
import com.refill.account.dto.request.RefreshRequest;
import com.refill.account.dto.response.EmailVerifyResponse;
import com.refill.account.dto.response.RefreshResponse;
import com.refill.account.dto.response.TokenResponse;
import com.refill.account.entity.ClientType;
import com.refill.account.exception.AccountException;
import com.refill.account.util.AccountUtil;
import com.refill.global.entity.Message;
import com.refill.global.entity.Role;
import com.refill.global.exception.ErrorCode;
import com.refill.global.service.AmazonS3Service;
import com.refill.global.service.AmazonSESService;
import com.refill.hospital.entity.Hospital;
import com.refill.hospital.service.HospitalOperatingHourService;
import com.refill.hospital.service.HospitalService;
import com.refill.member.entity.Member;
import com.refill.member.exception.MemberException;
import com.refill.member.service.MemberService;
import com.refill.security.util.JwtProvider;
import com.refill.security.util.LoginInfo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
@RequiredArgsConstructor
@Service
public class AccountService {

    private final AccountClientComposite accountClientComposite;
    private final MemberService memberService;
    private final HospitalService hospitalService;
    private final AmazonS3Service amazonS3Service;
    private final AmazonSESService amazonSESService;
    private final HospitalOperatingHourService hospitalOperatingHourService;
    private final BCryptPasswordEncoder passwordEncoder;
    private final JwtProvider jwtProvider;
    private final RedisTemplate<String, String> redisTemplate;
    @Value("${jwt.token.secret}")
    private String secretKey;

    //@Transactional(readOnly = true)
    public void isLoginIdDuplicated(String loginId) {

        boolean memberExists = memberService.existsByLoginId(loginId);
        boolean hospitalExists = hospitalService.existsByLoginId(loginId);

        if (memberExists || hospitalExists) {
            throw new AccountException(ErrorCode.LOGIN_ID_DUPLICATED);
        }

    }

    //@Transactional(readOnly = true)
    public void isEmailDuplicated(String email) {

        boolean memberExists = memberService.existsByEmail(email);
        boolean hospitalExists = hospitalService.existsByEmail(email);

        if (memberExists || hospitalExists) {
            throw new AccountException(ErrorCode.EMAIL_DUPLICATED);
        }
    }

    //@Transactional
    public void memberJoin(MemberJoinRequest memberJoinRequest, MultipartFile profileImg) {

        // 아이디 중복 검사
        isLoginIdDuplicated(memberJoinRequest.loginId());
        // 이메일 중복 검사
        isEmailDuplicated(memberJoinRequest.email());

        Member member = Member.from(memberJoinRequest);
        member.encodePassword(passwordEncoder.encode(member.getLoginPassword()));

        if (profileImg != null) {
            String profileAddress = amazonS3Service.uploadFile(profileImg);
            member.updateFileAddress(profileAddress);
        }

        memberService.save(member);

    }

    //@Transactional
    public void hospitalJoin(HospitalJoinRequest hospitalJoinRequest, MultipartFile profileImg, MultipartFile regImg) {

        // 아이디 중복 검사
        isLoginIdDuplicated(hospitalJoinRequest.loginId());
        // 이메일 중복 검사
        isEmailDuplicated(hospitalJoinRequest.email());

        Hospital hospital = Hospital.from(hospitalJoinRequest);
        hospital.encodePassword(passwordEncoder.encode(hospital.getLoginPassword()));

        String profileAddress = amazonS3Service.uploadFile(profileImg);
        String regAddress = amazonS3Service.uploadFile(regImg);

        hospital.updateProfileAddress(profileAddress);
        hospital.updateRegAddress(regAddress);

        Long id = hospitalService.save(hospital);
        hospitalOperatingHourService.generateHours(id);
    }

    public TokenResponse login(ClientType client, LoginRequest loginRequest) {
        return accountClientComposite.login(client, loginRequest);
    }


    public String findLoginId(ClientType clientType, LoginIdFindRequest loginIdFindRequest) {
        return accountClientComposite.findLoginId(clientType, loginIdFindRequest);
    }

    public String findPassword(ClientType clientType, LoginPasswordRequest loginPasswordRequest) {
        return accountClientComposite.findPassword(clientType, loginPasswordRequest);
    }

    public RefreshResponse refreshAccessToken(RefreshRequest refreshRequest) {

        String accessToken = jwtProvider.refreshAccessToken(refreshRequest.refreshToken(), secretKey);

        return new RefreshResponse(accessToken);
    }

    public void logout(LoginInfo loginInfo) {

        boolean tokenExists = redisTemplate.hasKey(loginInfo.loginId());

        if(tokenExists ) {
            redisTemplate.delete(loginInfo.loginId());
        }
    }

    @Transactional
    public EmailVerifyResponse verifyEmail(EmailVerifyRequest emailVerifyRequest) {

        isEmailDuplicated(emailVerifyRequest.email());

        String code = AccountUtil.getRandomCode(6);
        amazonSESService.sendCode(emailVerifyRequest.email(), code);

        return new EmailVerifyResponse(code);
    }

    @Transactional
    public String deleteAccount(Long id, LoginInfo loginInfo) {
        Role role = loginInfo.role();
        String message;
        if (role.equals(Role.ROLE_HOSPITAL) || role.equals(Role.ROLE_GUEST)) {
            hospitalService.delete(id);
            message = Message.ACCEPT_HOSPITAL_WITHDRAW.getMessage();
        } else if (role.equals(Role.ROLE_MEMBER)) {
            memberService.delete(id);
            message = Message.ACCEPT_MEMBER_WITHDRAW.getMessage();
        } else {
            throw new MemberException(ErrorCode.USERNAME_NOT_FOUND);
        }
        return message;
    }



}
