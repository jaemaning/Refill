package com.refill.member.dto.request;

public record MemberPasswordUpdateRequest(
    String oldPassword,
    String newPassword
) {

}
