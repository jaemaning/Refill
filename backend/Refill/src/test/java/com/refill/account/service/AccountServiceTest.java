package com.refill.account.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import com.refill.account.dto.request.HospitalJoinRequest;
import com.refill.account.dto.request.HospitalLoginRequest;
import com.refill.account.dto.request.LoginIdFindRequest;
import com.refill.account.dto.request.LoginPasswordRequest;
import com.refill.account.dto.request.MemberJoinRequest;
import com.refill.account.dto.request.MemberLoginRequest;
import com.refill.global.entity.Message;
import com.refill.global.entity.Role;
import com.refill.global.exception.ErrorCode;
import com.refill.hospital.entity.Hospital;
import com.refill.member.entity.Member;
import com.refill.member.exception.MemberException;
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

    @Test
    @Transactional
    @DisplayName("개인회원_로그인_아이디가_없으면_USERNAME_NOT_FOUND_에러를_반환한다")
    void t4() throws Exception {
        //given
        MemberJoinRequest memberJoinRequest = new MemberJoinRequest("member01", "pass01", "상원", "신상원", "hello", "01012345667",
            LocalDate.of(1995, 9, 24), "sangwon01@ssafy.com");

        accountService.memberJoin(memberJoinRequest, null);

        // when
        MemberLoginRequest memberLoginRequest = new MemberLoginRequest("member02", "pass01");

        MemberException exception = assertThrows(MemberException.class, () -> accountService.memberLogin(memberLoginRequest));

        assertEquals(exception.getErrorCode(), ErrorCode.USERNAME_NOT_FOUND);

    }

    @Test
    @Transactional
    @DisplayName("개인회원_로그인_비밀번호가_다르면_INVALID_PASSWORD_에러를_반환한다")
    void t5() throws Exception {
        //given
        MemberJoinRequest memberJoinRequest = new MemberJoinRequest("member01", "pass01", "상원", "신상원", "hello", "01012345667",
            LocalDate.of(1995, 9, 24), "sangwon01@ssafy.com");

        accountService.memberJoin(memberJoinRequest, null);

        // when
        MemberLoginRequest memberLoginRequest = new MemberLoginRequest("member01", "pass02");

        MemberException exception = assertThrows(MemberException.class, () -> accountService.memberLogin(memberLoginRequest));

        assertEquals(exception.getErrorCode(), ErrorCode.INVALID_PASSWORD);

    }

    @Test
    @Transactional
    @DisplayName("승인_대기중인_병원이_로그인하면_OUTSTANDING_AUTHORIZATION_반환한다")
    void t6() throws Exception {
        //given
        HospitalJoinRequest hospitalJoinRequest = new HospitalJoinRequest("hospital01", "pass01", "상원병원", "광산구", "12345", new BigDecimal(
            "12.12345"), new BigDecimal("14.12452"), "031-123-4253", "hospital@ssafy.com");

        MockMultipartFile profileImg1 = new MockMultipartFile("profileImg", "test.jpg", "image/jpeg", "test image".getBytes());
        MockMultipartFile regImg1 = new MockMultipartFile("regImg", "test.jpg", "image/jpeg", "test image".getBytes());

        when(amazonS3Service.uploadFile(any(MockMultipartFile.class))).thenReturn("SUCCESS");
        accountService.hospitalJoin(hospitalJoinRequest, profileImg1, regImg1);

        // when
        HospitalLoginRequest hospitalLoginRequest = new HospitalLoginRequest("hospital01", "pass01");

        MemberException exception = assertThrows(MemberException.class, () -> accountService.hospitalLogin(hospitalLoginRequest));

        assertEquals(exception.getErrorCode(), ErrorCode.OUTSTANDING_AUTHORIZATION);

    }

    @Test
    @Transactional
    @DisplayName("아이디_찾기_요청하면_가입한_이메일로_메일_전송한다")
    void t7() throws Exception {
        //given
        MemberJoinRequest memberJoinRequest = new MemberJoinRequest("member01", "pass01", "상원", "신상원", "hello", "01012345667",
            LocalDate.of(1995, 9, 24), "sangwon01@ssafy.com");

        accountService.memberJoin(memberJoinRequest, null);

        Member member = memberService.findByEmail(memberJoinRequest.email());
        assertNotNull(member);

        doNothing().when(amazonSESService).sendLoginId(any(String.class), any(String.class));

        LoginIdFindRequest loginIdFindRequest = new LoginIdFindRequest(member.getEmail());

        String msg = accountService.findMemberLoginId(loginIdFindRequest);
        verify(amazonSESService, times(1)).sendLoginId(any(String.class), any(String.class));
        assertEquals(msg, Message.FIND_LOGIN_ID.getMessage());
    }

    @Test
    @Transactional
    @DisplayName("비밀번호_찾기_요청하면_가입한_이메일로_메일_전송한다")
    void t8() throws Exception {
        //given
        MemberJoinRequest memberJoinRequest = new MemberJoinRequest("member01", "pass01", "상원", "신상원", "hello", "01012345667",
            LocalDate.of(1995, 9, 24), "sangwon01@ssafy.com");

        accountService.memberJoin(memberJoinRequest, null);

        Member member = memberService.findByEmail(memberJoinRequest.email());
        assertNotNull(member);

        doNothing().when(amazonSESService).sendTempPassword(any(String.class), any(String.class));

        LoginPasswordRequest loginIdFindRequest = new LoginPasswordRequest(member.getLoginId(), member.getEmail());

        String msg = accountService.findMemberPassword(loginIdFindRequest);

        verify(amazonSESService, times(1)).sendTempPassword(any(String.class), any(String.class));
        assertEquals(msg, Message.FIND_PASSWORD.getMessage());
    }


}