package com.refill.consulting.dto.request;

import javax.validation.constraints.NotNull;

public record ConsultingCloseRequest(
    String sessionId,
    String consultingDetailInfo
) {

}
