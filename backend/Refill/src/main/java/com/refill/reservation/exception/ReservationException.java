package com.refill.reservation.exception;

import com.refill.global.exception.BaseException;
import com.refill.global.exception.ErrorCode;

public class ReservationException extends BaseException {

    public ReservationException(ErrorCode errorCode) {
        super(errorCode);
    }
}
