package com.refill.hospital.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.refill.account.dto.request.HospitalJoinRequest;
import com.refill.doctor.entity.Doctor;
import com.refill.global.entity.Role;
import com.refill.global.entity.UserInfo;
import com.refill.hospital.dto.request.HospitalInfoUpdateRequest;
import com.refill.review.entity.Review;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.DynamicUpdate;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

@Getter
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
    String hospitalProfileImg;

    @Column
    String hospitalBannerImg;

    @Column(nullable = false)
    String registrationImg;

    @JsonIgnore
    @OneToMany(mappedBy = "hospital")
    @OneToMany(mappedBy = "hospital", orphanRemoval = true)
    @Builder.Default
    List<Doctor> doctors = new ArrayList<>();

    @JsonIgnore
    @OneToMany(mappedBy = "hospital")
    @OneToMany(mappedBy = "hospital", orphanRemoval = true)
    @Builder.Default
    List<Review> reviews = new ArrayList<>();

    @JsonIgnore
    @OneToMany(mappedBy = "hospital", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<HospitalOperatingHour> operatingHours = new ArrayList<>();

    public static Hospital from(HospitalJoinRequest hospitalJoinRequest) {
        return Hospital.builder()
                       .loginId(hospitalJoinRequest.loginId())
                       .loginPassword(hospitalJoinRequest.loginPassword())
                       .name(hospitalJoinRequest.name())
                       .address(hospitalJoinRequest.address())
                       .latitude(hospitalJoinRequest.latitude())
                       .longitude(hospitalJoinRequest.longitude())
                       .tel(hospitalJoinRequest.tel())
                       .email(hospitalJoinRequest.email())
                       .role(Role.ROLE_GUEST)
                       .build();
    }

    @JsonIgnore
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

    @JsonIgnore
    @Override
    public String getPassword() {
        return getLoginPassword();
    }

    @JsonIgnore
    @Override
    public String getUsername() {
        return getLoginId();
    }

    @JsonIgnore
    @Override
    public boolean isAccountNonExpired() {
        return false;
    }

    @JsonIgnore
    @Override
    public boolean isAccountNonLocked() {
        return false;
    }

    @JsonIgnore
    @Override
    public boolean isCredentialsNonExpired() {
        return false;
    }

    @JsonIgnore
    @Override
    public boolean isEnabled() {
        return false;
    }

    public void update(HospitalInfoUpdateRequest hospitalInfoUpdateRequest) {
        super.updateHospital(hospitalInfoUpdateRequest);
        this.latitude = hospitalInfoUpdateRequest.latitude();
        this.longitude = hospitalInfoUpdateRequest.longitude();
    }

    public void addReview(Review review){
        this.reviews.add(review);
        review.setHospital(this);
    }

    public void addDoctor(Doctor doctor){
        this.doctors.add(doctor);
        doctor.setHospital(this);
    }


}
