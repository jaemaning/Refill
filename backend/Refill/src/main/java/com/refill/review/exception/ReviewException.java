package com.refill.review.exception;

import com.refill.global.exception.ErrorCode;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ReviewException extends RuntimeException{
    private ErrorCode errorCode;
}
