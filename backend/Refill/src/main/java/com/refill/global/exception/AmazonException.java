package com.refill.global.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class AmazonException extends RuntimeException{

    private ErrorCode errorCode;
}
