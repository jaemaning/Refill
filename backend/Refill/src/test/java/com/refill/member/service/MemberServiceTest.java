package com.refill.member.service;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;

import com.refill.account.dto.request.MemberJoinRequest;
import com.refill.member.entity.Member;
import com.refill.member.exception.MemberException;
import com.refill.util.ServiceTest;
import java.time.LocalDate;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.transaction.annotation.Transactional;

class MemberServiceTest extends ServiceTest {

    @BeforeEach
    void tearUp() throws Exception {
        //given
        MemberJoinRequest memberJoinRequest = new MemberJoinRequest("member01", "pass01", "상원", "신상원", "hello", "01012345667",
            LocalDate.of(1995, 9, 24), "sangwon01@ssafy.com");

        accountService.memberJoin(memberJoinRequest, null);
    }

    @Test
    @Transactional
    @DisplayName("회원_가입된다")
    void t1() throws Exception {

        //when
        MemberJoinRequest memberJoinRequest = new MemberJoinRequest("member02", "pass01", "상원", "신상원", "hello", "01012345667",
            LocalDate.of(1995, 9, 24), "sangwon02@ssafy.com");

        memberService.save(Member.from(memberJoinRequest));
        Member member = memberService.findByLoginId(memberJoinRequest.loginId());

        assertNotNull(member);

    }

    @Test
    @Transactional
    @DisplayName("아이디로_회원_존재하는지_여부_판단된다")
    void t2() throws Exception {

        boolean memberExists = memberService.existsByLoginId("member01");
        boolean doesntExists = memberService.existsByLoginId("nothing");
        assertTrue(memberExists);
        assertFalse(doesntExists);
    }

    @Test
    @Transactional
    @DisplayName("이메일로_회원_존재하는지_여부_판단된다")
    void t3() throws Exception {

        boolean memberExists = memberService.existsByEmail("sangwon01@ssafy.com");
        boolean doesntExists = memberService.existsByEmail("nothing");

        assertTrue(memberExists);
        assertFalse(doesntExists);
    }

    @Test
    @Transactional
    @DisplayName("로그인아이디로_회원_조회된다_없는_회원이면_에러를_던진다")
    void t4() throws Exception {

        Member member = memberService.findByLoginId("member01");
        assertNotNull(member);

        assertThrows(MemberException.class, () -> memberService.findByLoginId("nothing"));

    }

    @Test
    @Transactional
    @DisplayName("이메일로_회원_조회된다_없는_회원이면_에러를_던진다")
    void t5() throws Exception {

        Member member = memberService.findByEmail("sangwon01@ssafy.com");
        assertNotNull(member);

        assertThrows(MemberException.class, () -> memberService.findByEmail("nothing"));

    }

    @Test
    @Transactional
    @DisplayName("아이디와_이메일로_회원_조회된다_없는_회원이면_에러를_던진다")
    void t6() throws Exception {

        Member member = memberService.findByLoginIdAndEmail("member01", "sangwon01@ssafy.com");
        assertNotNull(member);

        assertThrows(MemberException.class, () -> memberService.findByLoginIdAndEmail("nothing", "nothing"));

    }

}