package com.refill.hospital.dto.request;

import java.math.BigDecimal;
import javax.validation.constraints.NotNull;

public record HospitalLocationRequest(
    @NotNull BigDecimal sLat,
    @NotNull BigDecimal sLng,
    @NotNull BigDecimal eLat,
    @NotNull BigDecimal eLng,
    @NotNull BigDecimal curLat,
    @NotNull BigDecimal curLng
    ) {

}
