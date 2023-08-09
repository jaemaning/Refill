package com.refill.report.exception;

import com.refill.global.exception.ErrorCode;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ReportException extends RuntimeException{

    private ErrorCode errorCode;
}
