package com.refill.account.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import com.refill.account.dto.request.HospitalJoinRequest;
import com.refill.account.dto.request.MemberJoinRequest;
import com.refill.account.dto.request.MemberLoginRequest;
import com.refill.global.entity.Role;
import com.refill.hospital.entity.Hospital;
import com.refill.member.entity.Member;
import com.refill.util.ServiceTest;
import java.math.BigDecimal;
import java.time.LocalDate;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mock.web.MockMultipartFile;
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
            LocalDate.of(1995, 9, 24), "sangwon01@ssafy.com");

        accountService.memberJoin(memberJoinRequest, null);

        Member member = memberService.findByLoginId(memberJoinRequest.loginId());

        assertNotNull(member);
        assertEquals("상원", member.getNickname());
        assertNotEquals("pass01", member.getLoginPassword());
    }

    @Test
    @Transactional
    @DisplayName("병원_회원가입_성공한다")
    void t2() throws Exception {

        HospitalJoinRequest hospitalJoinRequest = new HospitalJoinRequest("hospital01", "pass01", "상원병원", "광산구", "12345", new BigDecimal(
            "12.12345"), new BigDecimal("14.12452"), "031-123-4253", "hospital@ssafy.com");

        MockMultipartFile profileImg1 = new MockMultipartFile("profileImg", "test.jpg", "image/jpeg", "test image".getBytes());
        MockMultipartFile regImg1 = new MockMultipartFile("regImg", "test.jpg", "image/jpeg", "test image".getBytes());

        when(amazonS3Service.uploadFile(any(MockMultipartFile.class))).thenReturn("SUCCESS");
        accountService.hospitalJoin(hospitalJoinRequest, profileImg1, regImg1);

        Hospital hospital = hospitalService.findByLoginId(hospitalJoinRequest.loginId());

        assertNotNull(hospital);
        assertEquals("상원병원", hospital.getName());
        assertEquals(Role.ROLE_GUEST, hospital.getRole());
        assertNotEquals("pass01", hospital.getLoginPassword());
    }

    @Test
    @Transactional
    @DisplayName("개인회원_로그인_성공한다")
    void t3() throws Exception {
        //given
        MemberJoinRequest memberJoinRequest = new MemberJoinRequest("member01", "pass01", "상원", "신상원", "hello", "01012345667",
            LocalDate.of(1995, 9, 24), "sangwon01@ssafy.com");

        accountService.memberJoin(memberJoinRequest, null);

        // when
        MemberLoginRequest memberLoginRequest = new MemberLoginRequest("member01", "pass01");
        String token = accountService.memberLogin(memberLoginRequest);

        assertNotNull(token);

    }

}