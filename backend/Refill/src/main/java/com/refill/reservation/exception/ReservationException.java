package com.refill.reservation.exception;

import com.refill.global.exception.ErrorCode;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class ReservationException extends RuntimeException{

    private ErrorCode errorCode;
}
