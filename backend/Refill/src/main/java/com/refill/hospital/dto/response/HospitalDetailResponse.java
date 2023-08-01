package com.refill.hospital.dto.response;

import com.refill.doctor.dto.response.DoctorResponse;
import com.refill.hospital.entity.Hospital;
import com.refill.review.dto.response.ReviewResponse;
import java.util.List;
import java.util.stream.Collectors;
import javax.validation.constraints.NotNull;

public record HospitalDetailResponse(
    @NotNull HospitalResponse hospitalResponse,
    @NotNull List<DoctorResponse> doctorResponses,
    @NotNull List<ReviewResponse> reviewResponses
) {

    public HospitalDetailResponse(Hospital hospital) {
        this(
            new HospitalResponse(hospital),
            hospital.getDoctors()
                    .stream()
                    .map(DoctorResponse::new)
                    .collect(Collectors.toList()),
            hospital.getReviews()
                    .stream()
                    .map(ReviewResponse::new).collect(Collectors.toList())
        );
    }
}
