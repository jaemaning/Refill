package com.refill.account.dto.request;

import java.math.BigDecimal;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import org.hibernate.validator.constraints.Length;

public record HospitalJoinRequest(
    @NotBlank(message = "아이디는 공백일 수 없습니다.") @Length(min = 4, max = 16) String loginId,
    @NotBlank(message = "비밀번호는 공백일 수 없습니다.") String loginPassword,
    @NotBlank(message = "병원 이름은 공백일 수 없습니다.") String name,
    @NotBlank(message = "병원 주소는 공백일 수 없습니다.") String address,
    @NotBlank String postalCode,
    @NotNull BigDecimal latitude,
    @NotNull BigDecimal longitude,
    @NotBlank(message = "병원 번호는 공백일 수 없습니다.") String tel,
    @NotBlank(message = "이메일은 공백일 수 없습니다.") @Email(message = "이메일 형식이 맞지 않습니다.") String email
) {

}
