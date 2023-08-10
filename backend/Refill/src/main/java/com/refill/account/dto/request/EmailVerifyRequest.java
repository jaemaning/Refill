package com.refill.account.dto.request;

import javax.validation.constraints.Email;

public record EmailVerifyRequest(
    @Email
    String email
) {

}
