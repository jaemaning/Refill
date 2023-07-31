package com.refill.global.entity;

import com.refill.member.dto.request.MemberInfoUpdateRequest;
import javax.persistence.Column;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.MappedSuperclass;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.DynamicUpdate;
import org.springframework.security.core.userdetails.UserDetails;

@ToString(callSuper = true)
@Getter
@SuperBuilder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@DynamicUpdate
@MappedSuperclass
public abstract class UserInfo extends BaseEntity implements UserDetails {

    @Column(unique = true, length = 20)
    private String loginId;

    @Column(nullable = false)
    private String loginPassword;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String address;

    @Column(nullable = false)
    private String tel;

    @Column(unique = true)
    private String email;

    @Enumerated(EnumType.STRING)
    private Role role;

    public void encodePassword(String encodedPassword) {
        this.loginPassword = encodedPassword;
    }


    public void acceptHospital() {
        this.role = Role.ROLE_HOSPITAL;
    }

    public void updateMember(MemberInfoUpdateRequest memberInfoUpdateRequest) {
        this.name = memberInfoUpdateRequest.name();
        this.address = memberInfoUpdateRequest.address();
        this.tel = memberInfoUpdateRequest.tel();
        this.email = memberInfoUpdateRequest.email();
    }

}

