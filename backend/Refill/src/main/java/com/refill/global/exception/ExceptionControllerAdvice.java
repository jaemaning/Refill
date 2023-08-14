package com.refill.global.exception;

import com.refill.global.dto.response.ApiErrorResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;


@Slf4j
@RestControllerAdvice
public class ExceptionControllerAdvice {

    @ExceptionHandler(BaseException.class)
    public ResponseEntity<ApiErrorResponse> memberExceptionHandler(BaseException e) {
        log.error("MemberException occurred: '{}'", e.getMessage(), e);
        return ResponseEntity.status(e.getErrorCode().getHttpStatus())
            .body(new ApiErrorResponse(e.getErrorCode().getCode(), e.getErrorCode(), e.getErrorCode().getMessage()));
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiErrorResponse> validExceptionHandler(Exception e) {
        log.error("ValidationException occurred : '{}'", e.getMessage(), e);
        ErrorCode errorCode = ErrorCode.INPUT_DATA_NOT_VALID;

        return ResponseEntity.status(errorCode.getHttpStatus()).body(new ApiErrorResponse(errorCode.getCode(), errorCode, errorCode.getMessage()));
    }


}
