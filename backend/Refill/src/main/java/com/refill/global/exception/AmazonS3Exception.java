package com.refill.global.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class AmazonS3Exception extends RuntimeException{

    private String code;
    private ErrorCode errorCode;
    private String message;
}
