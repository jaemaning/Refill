package com.refill.account.dto.request;

import java.time.LocalDate;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import org.hibernate.validator.constraints.Length;

public record MemberJoinRequest(

    @NotBlank(message = "아이디는 공백일 수 없습니다.") @Length(min = 4, max = 16) String loginId,
    @NotBlank(message = "비밀번호는 공백일 수 없습니다.") String loginPassword,
    @NotBlank(message = "닉네임은 공백일 수 없습니다.") @Length(min = 2, max = 16) String nickname,
    @NotBlank(message = "이름은 공백일 수 없습니다.") String name,
    @NotBlank(message = "주소는 공백일 수 없습니다.") String address,
    @NotBlank(message = "전화번호는 공백일 수 없습니다.") String tel,
    @NotNull(message = "생일을 입력해주세요.") LocalDate birthDay,
    @NotBlank(message = "이메일은 공백일 수 없습니다.") @Email(message = "이메일 형식이 맞지 않습니다.") String email


) {

}
