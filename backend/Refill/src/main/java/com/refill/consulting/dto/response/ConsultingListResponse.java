package com.refill.consulting.dto.response;

import com.refill.consulting.entity.Consulting;
import java.time.LocalDateTime;
public record ConsultingListResponse(
    Long consultingId,
    String hospitalName,
    String doctorName,
    LocalDateTime startDateTime
) {
    public ConsultingListResponse(Consulting consulting) {
        this (
            consulting.getId(),
            consulting.getDoctor().getHospital().getName(),
            consulting.getDoctor().getName(),
            consulting.getReservation().getStartDateTime()
        );
    }
}
