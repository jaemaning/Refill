package com.refill.aidiagnosis.exception;

import com.refill.global.exception.ErrorCode;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class AiDiagnosisException extends RuntimeException{

    private ErrorCode errorCode;
}
