package com.refill.hospital.dto.request;

import java.math.BigDecimal;
import javax.validation.constraints.NotNull;

public record HospitalInfoUpdateRequest(
    @NotNull String name,
    @NotNull String address,
    @NotNull String tel,
    @NotNull String email,
    @NotNull BigDecimal latitude,
    @NotNull BigDecimal longitude,
    @NotNull String postalCode
) {
}
