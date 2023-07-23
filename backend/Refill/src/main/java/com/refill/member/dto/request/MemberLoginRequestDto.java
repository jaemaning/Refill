package com.refill.member.dto.request;

public record MemberLoginRequestDto(
    String loginId,
    String loginPassword
) {

}
