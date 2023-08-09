package com.refill.account.dto.request;

import java.math.BigDecimal;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import org.hibernate.validator.constraints.Length;

public record HospitalJoinRequest(
    @NotBlank @Length(min = 4, max = 16) String loginId,
    @NotBlank String loginPassword,
    @NotBlank String name,
    @NotBlank String address,
    @NotBlank String postalCode,
    @NotNull BigDecimal latitude,
    @NotNull BigDecimal longitude,
    @NotBlank String tel,
    @NotBlank String email
) {

}
