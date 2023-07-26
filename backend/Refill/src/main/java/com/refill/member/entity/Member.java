package com.refill.member.entity;

import com.refill.account.dto.request.MemberJoinRequest;
import com.refill.global.entity.Role;
import com.refill.global.entity.UserInfo;
import java.time.LocalDate;
import java.util.Collection;
import java.util.Collections;
import javax.persistence.Column;
import javax.persistence.Entity;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

@ToString(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@SuperBuilder
@Entity
public class Member extends UserInfo {

    @Column(nullable = false)
    private LocalDate birthDay;

    @Column
    private String profileImg;

    @Column(nullable = false)
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
                     .name(memberJoinRequest.name())
                     .role(Role.ROLE_MEMBER)
                     .build();

    }

    public void updateFileAddress(String address) {
        this.profileImg = address;
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
