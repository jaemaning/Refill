package com.refill.account.dto.response;

public record TokenResponse(
    Long id,
    String accessToken,
    String refreshToken
) {

}
