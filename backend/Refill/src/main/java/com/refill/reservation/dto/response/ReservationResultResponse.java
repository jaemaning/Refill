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
        // 모든 컴포넌트를 가지는 생성자는 암시적으로 생성되어 있으므로
        this(
            reservation.getMember().getName(),
            reservation.getStartDateTime(),
            reservation.getDoctor().getHospital().getName(),
            reservation.getDoctor().getName()
        );
    }

}
