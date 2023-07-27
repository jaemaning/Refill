package com.refill.hospital.entity;

import com.refill.account.dto.request.HospitalJoinRequest;
import com.refill.global.entity.Role;
import com.refill.global.entity.UserInfo;
import java.math.BigDecimal;
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

@Getter
@ToString(callSuper = true)
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class Hospital extends UserInfo {

    @Column(nullable = false)
    BigDecimal latitude;

    @Column(nullable = false)
    BigDecimal longitude;

    @Column(nullable = false)
    String postalCode;

    @Column(nullable = false)
    String hospitalProfileImg;

    @Column(nullable = false)
    String registrationImg;

    public static Hospital from(HospitalJoinRequest hospitalJoinRequest) {
        return Hospital.builder()
                       .loginId(hospitalJoinRequest.loginId())
                       .loginPassword(hospitalJoinRequest.loginPassword())
                       .name(hospitalJoinRequest.name())
                       .address(hospitalJoinRequest.address())
                       .postalCode(hospitalJoinRequest.postalCode())
                       .latitude(hospitalJoinRequest.latitude())
                       .longitude(hospitalJoinRequest.longitude())
                       .tel(hospitalJoinRequest.tel())
                       .email(hospitalJoinRequest.email())
                       .role(Role.ROLE_GUEST)
                       .build();
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singletonList(new SimpleGrantedAuthority(getRole().name()));
    }

    public void updateFileAddress(String address) {
        this.hospitalProfileImg = address;
    }

    public void updateRegAddress(String address) {
        this.registrationImg = address;
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
