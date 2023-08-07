package com.refill.aidiagnosis.exception;

import com.refill.global.exception.BaseException;
import com.refill.global.exception.ErrorCode;

public class AiDiagnosisException extends BaseException {

    public AiDiagnosisException(ErrorCode errorCode) {
        super(errorCode);
    }
}
