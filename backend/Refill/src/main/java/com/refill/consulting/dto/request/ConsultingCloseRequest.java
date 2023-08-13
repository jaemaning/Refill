package com.refill.consulting.dto.request;

import javax.validation.constraints.NotNull;
import lombok.extern.java.Log;

public record ConsultingCloseRequest(
    Long consultingId,
    String sessionId,
    String consultingDetailInfo
) {

}
