package com.refill.account.dto.response;

public record TokenResponse(
    String accessToken,
    String refreshToken
) {

}
