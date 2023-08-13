package com.refill.aidiagnosis.dto.response;

import com.refill.aidiagnosis.entity.AiDiagnosis;
import java.time.LocalDate;

public record AiDiagnosisResponse (

    Integer hairLossScore,
    String certainty,
    String diagnosisImage,
    LocalDate diagnosisDate

) {

    public AiDiagnosisResponse(AiDiagnosis aiDiagnosis) {
        this (
            aiDiagnosis.getHairLossScore(),
            aiDiagnosis.getCertainty(),
            aiDiagnosis.getDiagnosisImage(),
            aiDiagnosis.getCreatedAt().toLocalDate()
        );
    }
}
