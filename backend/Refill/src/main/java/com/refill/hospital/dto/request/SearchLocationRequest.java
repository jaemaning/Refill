package com.refill.hospital.dto.request;

import java.math.BigDecimal;
import javax.validation.constraints.NotNull;

public record SearchLocationRequest (
    @NotNull BigDecimal latitude,
    @NotNull BigDecimal longitude,
    @NotNull Long radius){

}
