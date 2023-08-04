package com.refill.reservation.dto.request;

import java.time.LocalDateTime;

public record ReservationRequest(

    Long doctorId,
    LocalDateTime startDateTime,
    String counselingDemands

) {

}
