package com.refill.hospital.entity;

import com.refill.account.dto.request.HospitalJoinRequest;
import com.refill.doctor.entity.Doctor;
import com.refill.global.entity.Role;
import com.refill.global.entity.UserInfo;
import com.refill.hospital.dto.request.HospitalInfoUpdateRequest;
import com.refill.review.entity.Review;
import java.math.BigDecimal;
import java.util.Collection;
import java.util.Collections;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.DynamicUpdate;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

@Getter
@ToString(callSuper = true)
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@DynamicUpdate
public class Hospital extends UserInfo {

    @Column(nullable = false, precision = 9, scale = 6)
    BigDecimal latitude;

    @Column(nullable = false, precision = 9, scale = 6)
    BigDecimal longitude;

    @Column(nullable = false)
    String postalCode;

    @Column(nullable = false)
    String hospitalProfileImg;

    @Column
    String hospitalBannerImg;

    @Column(nullable = false)
    String registrationImg;

    @OneToMany(mappedBy = "hospital")
    List<Doctor> doctors;

    @OneToMany(mappedBy = "hospital")
    List<Review> reviews;

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

    public void updateProfileAddress(String address) {
        this.hospitalProfileImg = address;
    }
    public void updateBannerAddress(String address) {
        this.hospitalBannerImg = address;
    }
    public void updateRegistrationImg(String address) {
        this.registrationImg = address;
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

    public void update(HospitalInfoUpdateRequest hospitalInfoUpdateRequest) {
        super.updateHospital(hospitalInfoUpdateRequest);
        this.latitude = hospitalInfoUpdateRequest.latitude();
        this.longitude = hospitalInfoUpdateRequest.longitude();
        this.postalCode = hospitalInfoUpdateRequest.postalCode();

    }


}
