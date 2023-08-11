package com.refill.aidiagnosis.dto.response;

import com.refill.aidiagnosis.entity.AiDiagnosis;
import java.time.LocalDate;

public record AiDiagnosisListResponse(
    Long id,
    LocalDate diagnosisDate,
    Integer hairLossScore,
    String certainty,
    String diagnosisImage
) {

    public static AiDiagnosisListResponse from(AiDiagnosis aiDiagnosis) {
        return new AiDiagnosisListResponse(aiDiagnosis.getId(), aiDiagnosis.getCreatedAt().toLocalDate(), aiDiagnosis.getHairLossScore(), aiDiagnosis.getCertainty(), aiDiagnosis.getDiagnosisImage());
    }
}
