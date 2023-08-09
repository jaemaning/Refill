package com.refill.review.exception;

import com.refill.global.exception.BaseException;
import com.refill.global.exception.ErrorCode;

public class ReviewException extends BaseException{
    public ReviewException(ErrorCode errorCode) {
        super(errorCode);
    }
}
