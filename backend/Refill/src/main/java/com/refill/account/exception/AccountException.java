package com.refill.account.exception;

import com.refill.global.exception.BaseException;
import com.refill.global.exception.ErrorCode;

public class AccountException extends BaseException {

    public AccountException(ErrorCode errorCode) {
        super(errorCode);
    }

}
