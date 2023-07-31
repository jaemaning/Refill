package com.refill.member.service;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;

import com.refill.account.dto.request.MemberJoinRequest;
import com.refill.member.dto.request.MemberInfoUpdateRequest;
import com.refill.member.dto.request.MemberPasswordUpdateRequest;
import com.refill.member.dto.response.MemberInfoResponse;
import com.refill.member.entity.Member;
import com.refill.member.exception.MemberException;
import com.refill.util.ServiceTest;
import java.time.LocalDate;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.transaction.annotation.Transactional;

class MemberServiceTest extends ServiceTest {

    @Autowired
    BCryptPasswordEncoder passwordEncoder;
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

    @Test
    @Transactional
    @DisplayName("회원_마이페이지_조회_된다")
    void t7() throws Exception {

        final String loginId = "member01";
        MemberInfoResponse memberInfoResponse = memberService.getMemberByLoginId(loginId);

        Assertions.assertThat(memberInfoResponse).satisfies(
            member -> Assertions.assertThat(member).isNotNull(),
            member -> Assertions.assertThat(member.name()).isEqualTo("신상원")
        );
    }

    @Test
    @Transactional
    @DisplayName("회원_정보_수정된다")
    void t8() throws Exception {

        final String loginId = "member01";
        Member member = memberService.findByLoginId(loginId);

        MemberInfoUpdateRequest memberInfoUpdateRequest = new MemberInfoUpdateRequest("신호인", member.getAddress(), member.getBirthDay(), member.getTel(), "시그널만", member.getEmail());
        member.update(memberInfoUpdateRequest);

        Member member1 = memberService.findByLoginId(loginId);
        Assertions.assertThat(member1).satisfies(
            m -> Assertions.assertThat(m.getName()).isNotEqualTo("신상원"),
            m ->Assertions.assertThat(m.getName()).isEqualTo("신호인"),
            m ->Assertions.assertThat(m.getNickname()).isNotEqualTo("상원"),
            m ->Assertions.assertThat(m.getNickname()).isEqualTo("시그널만")
        );
    }

    @Nested
    @DisplayName("회원_비밀번호_수정할_때")
    class when_member_modify_password {

        final String loginId = "member01";
        final String oldPassword = "pass01";
        final String newPassword = "newPass";
        @Transactional
        @DisplayName("올바른_정보가_입력되면_수정된다")
        @Test
        void do_modify_password_with_exactly_information() throws Exception{


            Member member = memberService.findByLoginId(loginId);

            MemberPasswordUpdateRequest memberPasswordUpdateRequest = new MemberPasswordUpdateRequest(oldPassword, newPassword);
            memberService.modifyPassword(loginId, memberPasswordUpdateRequest);

            member = memberService.findByLoginId(loginId);

            Assertions.assertThat(member).satisfies(
                m -> Assertions.assertThat(passwordEncoder.matches(oldPassword, m.getLoginPassword())).isFalse(),
                m -> Assertions.assertThat(passwordEncoder.matches(newPassword, m.getLoginPassword())).isTrue()
            );

        }

        @Transactional
        @DisplayName("다른_비밀번호가_입력_되면_memberException_던진다")
        @Test
        void throw_member_exception_with_wrong_information() throws Exception {

            Member member = memberService.findByLoginId(loginId);
            MemberPasswordUpdateRequest memberPasswordUpdateRequest = new MemberPasswordUpdateRequest("wrong", newPassword);

            Assertions.assertThatExceptionOfType(MemberException.class).isThrownBy(() -> {
                memberService.modifyPassword(loginId, memberPasswordUpdateRequest);
            });
        }
    }

}