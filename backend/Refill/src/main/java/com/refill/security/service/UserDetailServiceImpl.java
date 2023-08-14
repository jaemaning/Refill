package com.refill.security.service;

import com.refill.global.exception.ErrorCode;
import com.refill.hospital.repository.HospitalRepository;
import com.refill.member.exception.MemberException;
import com.refill.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class UserDetailServiceImpl implements UserDetailsService {

    private final MemberRepository memberRepository;
    private final HospitalRepository hospitalRepository;

    @Cacheable(value = "UserCacheStore", key = "#loginId")
    @Override
    public UserDetails loadUserByUsername(String loginId) throws UsernameNotFoundException {

        return memberRepository.findByLoginId(loginId)
                               .map(UserDetails.class::cast)
                               .orElseGet(() ->
                                   hospitalRepository.findByLoginId(loginId)
                                                     .orElseThrow(() -> new MemberException(ErrorCode.USERNAME_NOT_FOUND))
                               );

    }
}
