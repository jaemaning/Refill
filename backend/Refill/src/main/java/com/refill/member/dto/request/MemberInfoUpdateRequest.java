package com.refill.member.dto.request;

import java.time.LocalDate;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

public record MemberInfoUpdateRequest(
    @NotBlank String name,
    @NotBlank String address,
    @NotNull LocalDate birthDay,
    @NotBlank String tel,
    @NotBlank String nickname,
    @NotBlank String email
) {

}
