package com.refill.hospital.exception;

import com.refill.global.exception.ErrorCode;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class HospitalException extends RuntimeException{

    private ErrorCode errorCode;
}
