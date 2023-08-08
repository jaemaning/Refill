package com.refill.reservation.dto.request;

import java.time.LocalDateTime;
import javax.validation.constraints.NotBlank;

public record ReservationRequest(

    @NotBlank Long doctorId,
    @NotBlank LocalDateTime startDateTime,
    String counselingDemands

) {

}
