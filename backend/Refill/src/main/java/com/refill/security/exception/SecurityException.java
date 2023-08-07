package com.refill.security.exception;

import com.refill.global.exception.BaseException;
import com.refill.global.exception.ErrorCode;

public class SecurityException extends BaseException {

    public SecurityException(ErrorCode errorCode) {
        super(errorCode);
    }

}
