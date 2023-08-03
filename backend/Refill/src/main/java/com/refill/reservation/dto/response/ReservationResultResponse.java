package com.refill.reservation.dto.response;

import java.time.LocalDateTime;

public record ReservationResultResponse(
    String memberName,
    LocalDateTime startDateTime,
    String hospitalName,
    String DoctorName
) {

}
