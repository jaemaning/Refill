package com.refill.account.service;

import static org.junit.jupiter.api.Assertions.*;

import com.refill.account.dto.request.MemberJoinRequest;
import com.refill.member.entity.Member;
import com.refill.util.ServiceTest;
import java.time.LocalDate;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.transaction.annotation.Transactional;

class AccountServiceTest extends ServiceTest {

    @Autowired
    BCryptPasswordEncoder passwordEncoder;
    @Test
    @Transactional
    @DisplayName("개인회원_회원가입_성공한다")
    void t1() throws Exception {

        MemberJoinRequest memberJoinRequest = new MemberJoinRequest("member01", "pass01", "상원", "신상원", "hello", "01012345667",
            LocalDate.of(1995, 9, 24), "sangwon01@ssafy.com", "sfar3fasdf");

        accountService.memberJoin(memberJoinRequest);

        Member member = memberService.findByLoginId(memberJoinRequest.loginId());

        assertNotNull(member);
        assertEquals("상원", member.getNickname());
        assertNotEquals("pass01", member.getLoginPassword());
    }

}