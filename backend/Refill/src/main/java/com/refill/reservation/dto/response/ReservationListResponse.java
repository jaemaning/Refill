package com.refill.reservation.dto.response;

import com.refill.reservation.entity.Reservation;
import java.time.LocalDateTime;

public record ReservationListResponse(
    Long reservationId,
    Long hospitalId,
    Long doctorId,
    Long memberId,
    String hospitalName,
    String doctorName,
    LocalDateTime startDateTime
) {

    public ReservationListResponse(Reservation reservation) {
        this (
            reservation.getId(),
            reservation.getDoctor().getHospital().getId(),
            reservation.getDoctor().getId(),
            reservation.getMember().getId(),
            reservation.getDoctor().getHospital().getName(),
            reservation.getDoctor().getName(),
            reservation.getStartDateTime()
        );
    }


}
