package com.refill.review.dto.request;

import javax.validation.constraints.NotNull;

public record ReviewModifyRequest(
    @NotNull String content,
    @NotNull Integer score
) {

}
