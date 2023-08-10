package com.refill.consulting.dto.request;

import javax.validation.constraints.NotNull;

public record ConsultingReportRequest(
    @NotNull String content
) {
}
