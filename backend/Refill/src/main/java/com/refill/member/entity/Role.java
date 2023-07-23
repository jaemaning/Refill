package com.refill.member.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum Role {

    ROLE_MEMBER(1),
    ROLE_ADMIN(9);

    private final int authLevel;
}
