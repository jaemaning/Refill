package com.refill.reservation.dto.response;

import com.refill.reservation.entity.Reservation;
import java.time.LocalDate;
import java.time.LocalDateTime;

public record ReservationInfoResponse(
    Long id,
    LocalDateTime startDate,
    String memberName,
    LocalDate birthDay,
    String tel,
    String counselingDemands

) {

    public ReservationInfoResponse(Reservation reservation) {
        this(
            reservation.getId(),
            reservation.getStartDateTime(),
            reservation.getMember().getName(),
            reservation.getMember().getBirthDay(),
            reservation.getMember().getTel(),
            reservation.getCounselingDemands()
        );
    }

}
