package com.refill.account.dto.request;

import java.time.LocalDate;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import org.hibernate.validator.constraints.Length;

public record MemberJoinRequest(

    @NotBlank @Length(min = 4, max = 16) String loginId,
    @NotBlank String loginPassword,
    @NotBlank @Length(min = 2, max = 16) String nickname,
    @NotBlank String name,
    @NotBlank String address,
    @NotBlank String tel,
    @NotNull LocalDate birthDay,
    @NotBlank String email


) {

}
