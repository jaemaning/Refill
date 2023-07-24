package com.refill.account.service;

import com.refill.hospital.repository.HospitalRepository;
import com.refill.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@RequiredArgsConstructor
@Service
public class AccountService {

    private final MemberRepository memberRepository;
    private final HospitalRepository hospitalRepository;

    private boolean isLoginIdDuplicated(String loginId) {



        return false;
    }
}
