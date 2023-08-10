package com.refill.consulting.exception;

import com.refill.global.exception.BaseException;
import com.refill.global.exception.ErrorCode;

public class ConsultingException extends BaseException {

    public ConsultingException(ErrorCode errorCode) {
        super(errorCode);
    }
}
