package com.refill.aidiagnosis.dto.response;

import com.refill.aidiagnosis.entity.AiDiagnosis;
import java.time.LocalDate;

public record AiDiagnosisListResponse(

    LocalDate diagnosisDate,
    Integer hairLossScore,
    String diagnosisImage
) {

    public static AiDiagnosisListResponse from(AiDiagnosis aiDiagnosis) {
        return new AiDiagnosisListResponse(aiDiagnosis.getCreatedAt().toLocalDate(), aiDiagnosis.getHairLossScore(), aiDiagnosis.getDiagnosisImage());
    }
}
