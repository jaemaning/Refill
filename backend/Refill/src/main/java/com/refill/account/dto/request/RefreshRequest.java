package com.refill.account.dto.request;

import javax.validation.constraints.NotBlank;

public record RefreshRequest(@NotBlank String refreshToken) {

}
