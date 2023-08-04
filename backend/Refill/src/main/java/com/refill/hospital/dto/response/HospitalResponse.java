package com.refill.hospital.dto.response;

import com.refill.hospital.entity.Hospital;
import com.refill.review.entity.Review;
import java.math.BigDecimal;
import javax.validation.constraints.NotNull;

public record HospitalResponse(
    @NotNull Long hospitalId,
    @NotNull String name,
    @NotNull BigDecimal longitude,
    @NotNull BigDecimal latitude,
    @NotNull String hospitalProfileImg,
    @NotNull String bannerProfileImg,
    @NotNull String address,
    @NotNull String tel,
    @NotNull Double score
) {
    public HospitalResponse(Hospital hospital){
        this(hospital.getId(),
            hospital.getName(),
            hospital.getLongitude(),
            hospital.getLatitude(),
            hospital.getHospitalProfileImg(),
            hospital.getHospitalBannerImg(),
            hospital.getAddress(),
            hospital.getTel(),
            hospital.getReviews().stream()
                    .mapToInt(Review::getScore)
                    .average()
                    .orElse(0.0));
    }

}
