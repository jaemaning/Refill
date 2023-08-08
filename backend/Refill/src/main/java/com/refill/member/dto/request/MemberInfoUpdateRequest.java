package com.refill.member.dto.request;

import java.time.LocalDate;
import javax.validation.constraints.NotBlank;

public record MemberInfoUpdateRequest(
    @NotBlank String name,
    @NotBlank String address,
    @NotBlank LocalDate birthDay,
    @NotBlank String tel,
    @NotBlank String nickname,
    @NotBlank String email
) {

}
