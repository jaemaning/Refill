package com.refill.util;

import com.refill.account.service.AccountService;
import com.refill.hospital.service.HospitalService;
import com.refill.member.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

@ActiveProfiles("test")
@SpringBootTest
public class ServiceTest {

    @Autowired protected MemberService memberService;
    @Autowired protected HospitalService hospitalService;
    @Autowired protected AccountService accountService;

}
