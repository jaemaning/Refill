package com.refill.hospital.entity;

import com.refill.global.entity.UserInfo;
import java.util.Collection;
import java.util.stream.Collectors;
import javax.persistence.Column;
import javax.persistence.Entity;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class Hospital extends UserInfo {

    @Column
    private String address;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return getRoles().stream()
                         .map(role -> new SimpleGrantedAuthority(role.name()))
                         .collect(Collectors.toSet());
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
