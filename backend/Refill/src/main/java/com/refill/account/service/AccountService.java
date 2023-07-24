package com.refill.account.service;

import com.refill.account.dto.request.MemberJoinRequest;
import com.refill.hospital.repository.HospitalRepository;
import com.refill.member.repository.MemberRepository;
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
    private final MemberRepository memberRepository;
    private final HospitalRepository hospitalRepository;

    private boolean isLoginIdDuplicated(String loginId) {

        boolean memberExists = memberRepository.existsByLoginId(loginId);
        boolean hospitalExists = hospitalRepository.existsByLoginId(loginId);

        return memberExists || hospitalExists;
    }

    @Transactional
    public void memberJoin(MemberJoinRequest memberJoinRequest) {

        if(isLoginIdDuplicated(memberJoinRequest.loginId())) {
            throw new RuntimeException();
        }




    }

}
