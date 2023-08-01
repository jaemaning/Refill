package com.refill.member.dto.request;

import java.time.LocalDate;

public record MemberInfoUpdateRequest(
    String name,
    String address,
    LocalDate birthDay,
    String tel,
    String nickname,
    String email
) {

}
