package com.refill.member.exception;

import com.refill.global.exception.BaseException;
import com.refill.global.exception.ErrorCode;

public class MemberException extends BaseException {

    public MemberException(ErrorCode errorCode) {
        super(errorCode);
    }
}
