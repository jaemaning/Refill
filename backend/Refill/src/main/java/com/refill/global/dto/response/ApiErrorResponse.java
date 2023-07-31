package com.refill.global.dto.response;

import com.refill.global.exception.ErrorCode;

public record ApiErrorResponse(
    String code,
    ErrorCode errorCode,
    String message
) {

}
