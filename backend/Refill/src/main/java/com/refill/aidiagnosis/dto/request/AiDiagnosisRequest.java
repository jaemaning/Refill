package com.refill.aidiagnosis.dto.request;

import javax.validation.constraints.NotBlank;

public record AiDiagnosisRequest (
    @NotBlank String surveyResult
) {

}
