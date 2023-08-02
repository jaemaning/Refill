package com.refill.aidiagnosis.dto.response;

import com.refill.aidiagnosis.entity.AiDiagnosis;
import com.refill.aidiagnosis.entity.HairLossType;
import java.time.LocalDate;

public record AiDiagnosisResponse (

    HairLossType hairLossType,
    String diagnosisImage,
    LocalDate createdAt

) {

    public AiDiagnosisResponse(AiDiagnosis aiDiagnosis) {
        this (
            aiDiagnosis.getHairLossType(),
            aiDiagnosis.getDiagnosisImage(),
            aiDiagnosis.getCreatedAt().toLocalDate()
        );
    }
}
