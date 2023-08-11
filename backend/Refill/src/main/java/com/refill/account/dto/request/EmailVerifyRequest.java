package com.refill.account.dto.request;

import javax.validation.constraints.Email;

public record EmailVerifyRequest(
    @Email(message = "이메일 형식이 맞지 않습니다.") String email
) {

}
