package com.refill.member.entity;

import com.refill.account.dto.request.MemberJoinRequest;
import com.refill.global.entity.UserInfo;
import java.time.LocalDate;
import java.util.Collection;
import java.util.Collections;
import javax.persistence.Column;
import javax.persistence.Entity;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@SuperBuilder
@Entity
public class Member extends UserInfo {

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private LocalDate birthDay;

    @Column(unique = true, nullable = false)
    private String email;

    @Column
    private String profileImg;

    @Column
    private String nickname;

    public static Member from(MemberJoinRequest memberJoinRequest) {
        return Member.builder()
                     .loginId(memberJoinRequest.loginId())
                     .loginPassword(memberJoinRequest.loginPassword())
                     .nickname(memberJoinRequest.nickname())
                     .address(memberJoinRequest.address())
                     .tel(memberJoinRequest.tel())
                     .birthDay(memberJoinRequest.birthDay())
                     .email(memberJoinRequest.email())
                     .profileImg(memberJoinRequest.profileImg())
                     .build();

    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {

        return Collections.singletonList(new SimpleGrantedAuthority(getRole().name()));
    }

    @Override
    public String getPassword() {
        return getLoginPassword();
    }

    @Override
    public String getUsername() {
        return getLoginId();
    }

    @Override
    public boolean isAccountNonExpired() {
        return false;
    }

    @Override
    public boolean isAccountNonLocked() {
        return false;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return false;
    }

    @Override
    public boolean isEnabled() {
        return false;
    }
}
