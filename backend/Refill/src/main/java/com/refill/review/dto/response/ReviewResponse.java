package com.refill.review.dto.response;

import com.refill.review.entity.Review;
import java.time.format.DateTimeFormatter;
import javax.validation.constraints.NotNull;

public record ReviewResponse(
    @NotNull Long reviewId,
    @NotNull Integer score,
    @NotNull String content,
    @NotNull Long memberId,
    @NotNull String nickname,
    @NotNull Long doctorId,
    @NotNull String doctorName,
    @NotNull Long hospitalId,
    @NotNull String hospitalName,
    @NotNull String updateDate,
    @NotNull String category
    ) {

    public ReviewResponse(Review review) {
        this(
            review.getId(),
            review.getScore(),
            review.getContent(),
            review.getMember().getId(),
            review.getMember()
                  .getNickname(),
            review.getDoctor().getId(),
            review.getDoctor().getName(),
            review.getHospital().getId(),
            review.getHospital().getName(),
            review.getUpdatedAt().format(DateTimeFormatter.ofPattern("YYYY.MM.dd")),
            review.getCategory()
        );
    }
}
