package com.refill.aidiagnosis.dto.response;

import com.refill.aidiagnosis.entity.AiDiagnosis;
import java.time.LocalDate;

public record AiDiagnosisResponse (

    Integer hairLossScore,
    String diagnosisImage,
    LocalDate createdAt

) {

    public AiDiagnosisResponse(AiDiagnosis aiDiagnosis) {
        this (
            aiDiagnosis.getHairLossScore(),
            aiDiagnosis.getDiagnosisImage(),
            aiDiagnosis.getCreatedAt().toLocalDate()
        );
    }
}
