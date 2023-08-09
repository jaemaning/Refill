package com.refill.member.dto.request;

import javax.validation.constraints.NotBlank;

public record MemberPasswordUpdateRequest(
    @NotBlank String oldPassword,
    @NotBlank String newPassword
) {

}
