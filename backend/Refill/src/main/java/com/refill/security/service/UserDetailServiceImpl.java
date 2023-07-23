package com.refill.security.service;

import com.refill.global.exception.ErrorCode;
import com.refill.member.exception.MemberException;
import com.refill.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class UserDetailServiceImpl implements UserDetailsService {

    private final MemberRepository memberRepository;

    @Override
    public UserDetails loadUserByUsername(String loginId) throws UsernameNotFoundException {
        return memberRepository.findByLoginId(loginId)
                               .orElseThrow(
                                   () -> new MemberException(
                                       ErrorCode.USERNAME_NOT_FOUND.getCode(),
                                       ErrorCode.USERNAME_NOT_FOUND,
                                       ErrorCode.USERNAME_NOT_FOUND.getMessage()
                                   ));
    }
}
