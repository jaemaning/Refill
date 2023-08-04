package com.refill.review.dto.request;

import javax.validation.constraints.NotNull;

public record ReviewCreateRequest(
    @NotNull Long hospitalId,
    @NotNull Long doctorId,
    @NotNull Long memberId,
    @NotNull String content,
    @NotNull String category,
    @NotNull Integer score
) {
}
