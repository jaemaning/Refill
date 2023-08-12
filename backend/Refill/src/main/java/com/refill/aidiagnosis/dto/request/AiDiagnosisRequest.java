package com.refill.aidiagnosis.dto.request;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

public record AiDiagnosisRequest (
    @NotNull String surveyResult
) {

}
