package com.refill.hospital.dto.response;

import com.refill.hospital.entity.Hospital;
import javax.validation.constraints.NotNull;

public record HospitalSearchByLocationResponse(
    @NotNull HospitalResponse hospitalResponse,
    @NotNull Double dist
    ){
    public HospitalSearchByLocationResponse(Hospital hospital, Double dist){
        this(
            new HospitalResponse(hospital),
            dist
        );
    }
}
