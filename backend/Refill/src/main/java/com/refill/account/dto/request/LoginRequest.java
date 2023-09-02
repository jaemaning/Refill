package com.refill.account.dto.request;

import javax.validation.constraints.NotBlank;

public record LoginRequest(
    @NotBlank String loginId,
    @NotBlank String loginPassword
) {

}
