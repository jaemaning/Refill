package com.refill.account.dto.request;

import javax.validation.constraints.NotBlank;

public record LoginPasswordRequest(
    @NotBlank String loginId,
    @NotBlank String email
) {

}
