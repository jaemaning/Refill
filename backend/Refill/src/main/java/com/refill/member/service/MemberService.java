package com.refill.member.service;

import com.refill.global.entity.Role;
import com.refill.member.entity.Member;
import com.refill.member.repository.MemberRepository;
import com.refill.security.util.JwtProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@RequiredArgsConstructor
@Service
public class MemberService {

    private final MemberRepository memberRepository;
    private final JwtProvider jwtProvider;

    @Value("${jwt.token.secret}")
    private String secretKey;

    public void testCreate() {
        memberRepository.save(Member.builder()
                                    .loginId("member01")
                                    .name("귤민")
                                    .role(Role.ROLE_ADMIN)
                                    .build());
    }

    @Transactional
    public Long save(Member member) {
        return memberRepository.save(member).getId();
    }

    @Transactional(readOnly = true)
    public boolean existsByLoginId(String loginId) {
        return memberRepository.existsByLoginId(loginId);
    }

    @Transactional(readOnly = true)
    public boolean existsByEmail(String email) {
        return memberRepository.existsByEmail(email);
    }

    @Transactional(readOnly = true)
    public Member findByLoginId(String loginId) {
        return memberRepository.findByLoginId(loginId)
                               .orElseThrow(() -> new UsernameNotFoundException("존재하지 않는 아이디입니다."));
    }

}
