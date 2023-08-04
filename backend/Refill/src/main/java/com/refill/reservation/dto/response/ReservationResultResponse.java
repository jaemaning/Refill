package com.refill.reservation.dto.response;

import com.refill.reservation.entity.Reservation;
import java.time.LocalDateTime;

public record ReservationResultResponse(
    String memberName,
    LocalDateTime startDateTime,
    String hospitalName,
    String doctorName
) {
    public ReservationResultResponse(Reservation reservation) {
        this(
            reservation.getMember().getName(),
            reservation.getStartDateTime(),
            reservation.getDoctor().getHospital().getName(),
            reservation.getDoctor().getName()
        );
    }

}
