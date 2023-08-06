package com.refill.reservation.dto.response;

import com.refill.reservation.entity.Reservation;
import java.time.LocalDateTime;

public record DisabledReservationTimeResponse(

    LocalDateTime startDateTime
) {

    public DisabledReservationTimeResponse(Reservation reservation) {
        this(
            reservation.getStartDateTime()
        );
    }

}
