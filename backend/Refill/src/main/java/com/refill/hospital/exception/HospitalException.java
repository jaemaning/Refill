package com.refill.hospital.exception;

import com.refill.global.exception.BaseException;
import com.refill.global.exception.ErrorCode;

public class HospitalException extends BaseException {

    public HospitalException(ErrorCode errorCode) {
        super(errorCode);
    }
}
