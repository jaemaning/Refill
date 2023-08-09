package com.refill.account.dto.request;

import javax.validation.constraints.NotBlank;

public record HospitalLoginRequest(

    @NotBlank String loginId,
    @NotBlank String loginPassword
) {

}
