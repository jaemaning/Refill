package com.refill.account.dto.request;

import javax.validation.constraints.NotBlank;

public record MemberLoginRequest(
    @NotBlank String loginId,
    @NotBlank String loginPassword
) {

}
