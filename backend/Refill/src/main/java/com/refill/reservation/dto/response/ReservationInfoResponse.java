package com.refill.reservation.dto.response;

import com.refill.reservation.entity.Reservation;
import java.time.LocalDate;
import java.time.LocalDateTime;

public record ReservationInfoResponse(
    Long reservationId,
    Long hospitalId,
    Long doctorId,
    Long memberId,
    LocalDateTime startDate,
    String memberName,
    LocalDate birthDay,
    String tel,
    String counselingDemands,
    String hairImage

) {

    public ReservationInfoResponse(Reservation reservation) {
        this(
            reservation.getId(),
            reservation.getDoctor().getHospital().getId(),
            reservation.getDoctor().getId(),
            reservation.getMember().getId(),
            reservation.getStartDateTime(),
            reservation.getMember().getName(),
            reservation.getMember().getBirthDay(),
            reservation.getMember().getTel(),
            reservation.getCounselingDemands(),
            reservation.getHairImage()
        );
    }

}
