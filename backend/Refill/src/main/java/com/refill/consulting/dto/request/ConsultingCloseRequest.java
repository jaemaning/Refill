package com.refill.consulting.dto.request;

import javax.validation.constraints.NotNull;

public record ConsultingCloseRequest(
    @NotNull String sessionId,
    @NotNull String consultingDetailInfo
) {

}
