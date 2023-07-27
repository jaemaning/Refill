package com.refill.account.dto.request;

public record LoginPasswordRequest(
    String loginId,
    String email
) {

}
