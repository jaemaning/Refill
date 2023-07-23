package com.refill.global.entity;

import javax.persistence.Column;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.MappedSuperclass;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.springframework.security.core.userdetails.UserDetails;

@Getter
@SuperBuilder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@MappedSuperclass
public abstract class UserInfo extends BaseEntity implements UserDetails {

    @Column(unique = true, length = 20)
    private String loginId;

    @Column(length = 25)
    private String loginPassword;

    @Column
    private String name;

    @Enumerated(EnumType.STRING)
    private Role role;

}

