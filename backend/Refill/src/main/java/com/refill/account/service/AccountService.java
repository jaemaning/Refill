package com.refill.account.service;

import com.refill.account.dto.request.MemberJoinRequest;
import com.refill.account.exception.AccountException;
import com.refill.global.exception.ErrorCode;
import com.refill.hospital.service.HospitalService;
import com.refill.member.entity.Member;
import com.refill.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@RequiredArgsConstructor
@Service
public class AccountService {

    private final MemberService memberService;
    private final HospitalService hospitalService;
    private final BCryptPasswordEncoder passwordEncoder;

    private boolean isLoginIdDuplicated(String loginId) {

        boolean memberExists = memberService.existsByLoginId(loginId);
        boolean hospitalExists = hospitalService.existsByLoginId(loginId);

        return memberExists || hospitalExists;
    }

    private boolean isEmailDuplicated(String email) {

        boolean memberExists = memberService.existsByEmail(email);
        boolean hospitalExists = hospitalService.existsByEmail(email);

        return memberExists || hospitalExists;
    }

    @Transactional
    public void memberJoin(MemberJoinRequest memberJoinRequest) {

        // 아이디 중복 검사
        if (isLoginIdDuplicated(memberJoinRequest.loginId())) {
            throw new AccountException(
                ErrorCode.LOGIN_ID_DUPLICATED.getCode(),
                ErrorCode.LOGIN_ID_DUPLICATED,
                ErrorCode.LOGIN_ID_DUPLICATED.getMessage()
            );
        }

        // 이메일 중복 검사
        if(isEmailDuplicated(memberJoinRequest.email())) {
            throw new AccountException(
                ErrorCode.EMAIL_DUPLICATED.getCode(),
                ErrorCode.EMAIL_DUPLICATED,
                ErrorCode.EMAIL_DUPLICATED.getMessage()
            );
        }

        Member member = Member.from(memberJoinRequest);
        member.encodePassword(passwordEncoder.encode(member.getPassword()));
        memberService.save(member);

    }

}
