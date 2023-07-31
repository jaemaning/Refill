package com.refill.hospital.dto.request;

import java.math.BigDecimal;
import javax.validation.constraints.NotNull;

public record HospitalSearchByLocationRequest(
    @NotNull BigDecimal latitude,
    @NotNull BigDecimal longitude,
    @NotNull Long radius){

}
