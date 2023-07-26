package com.refill.account.dto.request;

public record MemberLoginRequest(
    String loginId,
    String loginPassword
) {

}
