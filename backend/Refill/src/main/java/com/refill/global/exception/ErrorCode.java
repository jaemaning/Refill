package com.refill.global.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum ErrorCode {

    //AccountException
    LOGIN_ID_DUPLICATED("ACC01", HttpStatus.CONFLICT, "이미 존재하는 ID 입니다."),
    EMAIL_DUPLICATED("ACC02", HttpStatus.CONFLICT, "이미 존재하는 EMAIL 입니다."),
    ILLEGAL_CLIENT_TYPE("ACC03", HttpStatus.BAD_REQUEST, "존재하지 않는 클라이언트 타입입니다."),

    // MemberException
    INVALID_REFRESH_TOKEN("MEM01", HttpStatus.BAD_REQUEST, "유효한 토큰이 아닙니다."),
    USERNAME_NOT_FOUND("MEM02", HttpStatus.NOT_FOUND, "아이디가 존재하지 않습니다"),
    INVALID_PASSWORD("MEM03", HttpStatus.UNAUTHORIZED, "패스워드가 일치하지 않습니다."),
    OUTSTANDING_AUTHORIZATION("MEM04", HttpStatus.UNAUTHORIZED, "승인 대기중인 병원입니다"),
    ALREADY_ACCEPT("MEM05", HttpStatus.BAD_REQUEST, "이미 승인된 병원입니다."),
    ACCESS_DENIED("MEM06", HttpStatus.NOT_ACCEPTABLE, "해당 요청에 권한이 없습니다."),
    UNAUTHORIZED_REQUEST("MEM07", HttpStatus.UNAUTHORIZED, "권한이 없습니다."),

    /* File Upload Exception*/
    FILE_UPLOAD_FAIL("AWS01", HttpStatus.INTERNAL_SERVER_ERROR, "파일 업로드에 실패하였습니다."),

    /* Mail Service Exception*/
    MAIL_SEND_FAIL("AWS02", HttpStatus.INTERNAL_SERVER_ERROR, "메일 전송에 실패하였습니다"),

    /* HOSPITAL SEARCH Exception */
    INVALID_LOCATION_REQUEST("SEARCH01", HttpStatus.BAD_REQUEST, "위치 검색에 대한 잘못된 요청입니다."),

    /* AI SERVER Exception */
    AI_SERVER_CLIENT_ERROR("AI01", HttpStatus.BAD_REQUEST, "클라이언트 에러입니다."),
    AI_SERVER_ERROR("AI02", HttpStatus.INTERNAL_SERVER_ERROR, "AI 서버 에러입니다."),
    AI_SERVER_WRONG_PICTURE("AI03", HttpStatus.BAD_REQUEST, "잘못 된 사진입니다."),
    /* Review Exception */
    REVIEW_NOT_FOUND("REV", HttpStatus.NOT_FOUND, "존재하지 않는 리뷰입니다."),

    /* Reservation Exception */
    ALREADY_RESERVED("RES01", HttpStatus.BAD_REQUEST, "이미 예약된 시간입니다."),
    MEMBER_RESERVATION_DUPLICATED("RES02", HttpStatus.BAD_REQUEST, "이미 같은 시간에 예약하셨습니다."),

    REPORT_NOT_FOUND("RPT01", HttpStatus.NOT_FOUND, "존재하지 않는 신고입니다."),

    /* Consulting Exception */
    CONSULTING_NOT_YET("CON01",HttpStatus.BAD_REQUEST,"방이 아직 생성되지 않았습니다."),
    SESSION_FAIL("CON02",HttpStatus.BAD_REQUEST,"해당 세션이 존재하지 않습니다."),
    CONSULTING_DETAIL_ERROR("CON03",HttpStatus.BAD_REQUEST,"해당 삼당 기록이 존재하지 않습니다."),

    /* IO EXCEPTION */
    INPUT_DATA_NOT_VALID("IN01", HttpStatus.BAD_REQUEST, "입력이 유효하지 않습니다.");


    private final String code;
    private final HttpStatus httpStatus;
    private final String message;
}
