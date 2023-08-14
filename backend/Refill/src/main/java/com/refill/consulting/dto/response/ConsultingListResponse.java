package com.refill.consulting.dto.response;

import com.refill.consulting.entity.Consulting;
import java.time.LocalDateTime;
public record ConsultingListResponse(
    Long consultingId,
    Long memberId,
    Long doctorId,
    Long hospitalId,
    String hospitalName,
    String doctorName,
    LocalDateTime startDateTime
) {
    public ConsultingListResponse(Consulting consulting) {
        this (
            consulting.getId(),
            consulting.getMember().getId(),
            consulting.getDoctor().getId(),
            consulting.getDoctor().getHospital().getId(),
            consulting.getDoctor().getHospital().getName(),
            consulting.getDoctor().getName(),
            consulting.getReservation().getStartDateTime()
        );
    }
}
