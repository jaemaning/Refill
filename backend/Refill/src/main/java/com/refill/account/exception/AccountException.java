package com.refill.account.exception;

import com.refill.global.exception.ErrorCode;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class AccountException extends RuntimeException{

    private String code;
    private ErrorCode errorCode;
    private String message;
}
