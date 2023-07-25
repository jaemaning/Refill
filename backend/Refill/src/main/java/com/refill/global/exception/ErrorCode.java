package com.refill.global.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum ErrorCode {

    //AccountException
    LOGIN_ID_DUPLICATED("ACC01", HttpStatus.CONFLICT, "이미 존재하는 ID 입니다."),

    // MemberException
    INVALID_REFRESH_TOKEN("MEM01", HttpStatus.BAD_REQUEST, "유효한 토큰이 아닙니다."),
    USERNAME_NOT_FOUND("MEM01", HttpStatus.NOT_FOUND, "아이디가 존재하지 않습니다");

    private final String code;
    private final HttpStatus httpStatus;
    private final String message;
}
