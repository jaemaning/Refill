package com.refill.security.util;

import com.refill.global.entity.Role;

public record LoginInfo(
    String loginId,
    Role role
) {

}
