package com.refill.account.service;

import com.refill.account.dto.request.MemberJoinRequest;
import com.refill.account.exception.AccountException;
import com.refill.global.exception.ErrorCode;
import com.refill.hospital.service.HospitalService;
import com.refill.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@RequiredArgsConstructor
@Service
public class AccountService {

    private final MemberService memberService;
    private final HospitalService hospitalService;

    private boolean isLoginIdDuplicated(String loginId) {

        boolean memberExists = memberService.existsByLoginId(loginId);
        boolean hospitalExists = hospitalService.existsByLoginId(loginId);

        return memberExists || hospitalExists;
    }

    @Transactional
    public void memberJoin(MemberJoinRequest memberJoinRequest) {

        if (isLoginIdDuplicated(memberJoinRequest.loginId())) {
            throw new AccountException(
                ErrorCode.LOGIN_ID_DUPLICATED.getCode(),
                ErrorCode.LOGIN_ID_DUPLICATED,
                ErrorCode.LOGIN_ID_DUPLICATED.getMessage()
            );
        }


    }

}
