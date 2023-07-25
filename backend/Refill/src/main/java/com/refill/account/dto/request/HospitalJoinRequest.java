package com.refill.account.dto.request;

import java.math.BigDecimal;
import javax.validation.constraints.NotNull;
import org.hibernate.validator.constraints.Length;

public record HospitalJoinRequest(
    @NotNull @Length(min = 4, max = 16) String loginId,
    @NotNull String loginPassword,
    @NotNull String name,
    @NotNull String address,
    @NotNull String postalCode,
    @NotNull BigDecimal latitude,
    @NotNull BigDecimal longitude,
    @NotNull String tel,
    @NotNull String email,
    @NotNull String hospitalProfileImg,
    @NotNull String registrationImg
) {

}
