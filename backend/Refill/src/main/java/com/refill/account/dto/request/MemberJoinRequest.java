package com.refill.account.dto.request;

import java.time.LocalDate;
import javax.validation.constraints.NotNull;
import org.hibernate.validator.constraints.Length;

public record MemberJoinRequest(

    @NotNull @Length(min = 4, max = 16) String loginId,
    @NotNull String loginPassword,
    @NotNull @Length(min = 2, max = 8) String nickname,
    @NotNull String name,
    @NotNull String address,
    @NotNull String tel,
    @NotNull LocalDate birthDay,
    @NotNull String email


) {

}
