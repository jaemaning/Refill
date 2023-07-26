package com.refill.account.service;

import com.refill.account.dto.request.HospitalJoinRequest;
import com.refill.account.dto.request.HospitalLoginRequest;
import com.refill.account.dto.request.MemberJoinRequest;
import com.refill.account.dto.request.MemberLoginRequest;
import com.refill.account.exception.AccountException;
import com.refill.global.exception.ErrorCode;
import com.refill.global.service.AmazonS3Service;
import com.refill.hospital.entity.Hospital;
import com.refill.hospital.service.HospitalService;
import com.refill.member.entity.Member;
import com.refill.member.exception.MemberException;
import com.refill.member.service.MemberService;
import com.refill.security.util.JwtProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
@RequiredArgsConstructor
@Service
public class AccountService {

    private final MemberService memberService;
    private final HospitalService hospitalService;
    private final BCryptPasswordEncoder passwordEncoder;
    private final AmazonS3Service amazonS3Service;
    private final JwtProvider jwtProvider;
    @Value("${jwt.token.secret}")
    private String secretKey;

    @Transactional(readOnly = true)
    public void isLoginIdDuplicated(String loginId) {

        boolean memberExists = memberService.existsByLoginId(loginId);
        boolean hospitalExists = hospitalService.existsByLoginId(loginId);

        if(memberExists || hospitalExists) {
            throw new AccountException(
                ErrorCode.LOGIN_ID_DUPLICATED.getCode(),
                ErrorCode.LOGIN_ID_DUPLICATED,
                ErrorCode.LOGIN_ID_DUPLICATED.getMessage()
            );
        }

    }

    @Transactional(readOnly = true)
    public void isEmailDuplicated(String email) {

        boolean memberExists = memberService.existsByEmail(email);
        boolean hospitalExists = hospitalService.existsByEmail(email);

        if(memberExists || hospitalExists) {
            throw new AccountException(
                ErrorCode.EMAIL_DUPLICATED.getCode(),
                ErrorCode.EMAIL_DUPLICATED,
                ErrorCode.EMAIL_DUPLICATED.getMessage()
            );
        }
    }

    @Transactional
    public void memberJoin(MemberJoinRequest memberJoinRequest, MultipartFile profileImg) {

        // 아이디 중복 검사
        isLoginIdDuplicated(memberJoinRequest.loginId());
        // 이메일 중복 검사
        isEmailDuplicated(memberJoinRequest.email());

        Member member = Member.from(memberJoinRequest);
        member.encodePassword(passwordEncoder.encode(member.getLoginPassword()));

        if(profileImg != null) {
            String profileAddress = amazonS3Service.uploadFile(profileImg);
            member.updateFileAddress(profileAddress);
        }

        memberService.save(member);

    }

    @Transactional
    public void hospitalJoin(HospitalJoinRequest hospitalJoinRequest, MultipartFile profileImg, MultipartFile regImg) {

        // 아이디 중복 검사
        isLoginIdDuplicated(hospitalJoinRequest.loginId());
        // 이메일 중복 검사
        isEmailDuplicated(hospitalJoinRequest.email());

        Hospital hospital = Hospital.from(hospitalJoinRequest);
        hospital.encodePassword(passwordEncoder.encode(hospital.getLoginPassword()));

        String profileAddress = amazonS3Service.uploadFile(profileImg);
        String regAddress = amazonS3Service.uploadFile(regImg);

        hospital.updateFileAddress(profileAddress);
        hospital.updateRegAddress(regAddress);

        hospitalService.save(hospital);
    }

    @Transactional(readOnly = true)
    public String memberLogin(MemberLoginRequest memberLoginRequest) {

        Member member = memberService.findByLoginId(memberLoginRequest.loginId());

        // 1. id가 없는 경우는 findByLoginId 에서 처리
        // 2. 패스워드가 일치하지 않음

        if(!passwordEncoder.matches(memberLoginRequest.loginPassword(), member.getLoginPassword())) {
            throw new MemberException(ErrorCode.INVALID_PASSWORD.getCode(), ErrorCode.INVALID_PASSWORD, ErrorCode.INVALID_PASSWORD.getMessage());
        }

        return jwtProvider.createToken(member.getLoginId(), member.getRole(), secretKey);

    }

    @Transactional(readOnly = true)
    public String hospitalLogin(HospitalLoginRequest hospitalLoginRequest) {

        Hospital hospital = hospitalService.findByLoginId(hospitalLoginRequest.loginId());

        // 1. id가 없는 경우는 findByLoginId 에서 처리
        // 2. 패스워드가 일치하지 않음

        if(!passwordEncoder.matches(hospitalLoginRequest.loginPassword(), hospital.getLoginPassword())) {
            throw new MemberException(ErrorCode.INVALID_PASSWORD.getCode(), ErrorCode.INVALID_PASSWORD, ErrorCode.INVALID_PASSWORD.getMessage());
        }

        return jwtProvider.createToken(hospital.getLoginId(), hospital.getRole(), secretKey);
    }
}
