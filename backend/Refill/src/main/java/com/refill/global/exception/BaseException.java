package com.refill.global.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public abstract class BaseException extends RuntimeException{

    private ErrorCode errorCode;
}
