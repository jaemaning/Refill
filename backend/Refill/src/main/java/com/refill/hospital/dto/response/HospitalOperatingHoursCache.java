package com.refill.hospital.dto.response;

import com.fasterxml.jackson.annotation.JsonTypeInfo;
import com.fasterxml.jackson.annotation.JsonTypeName;
import java.util.List;

@JsonTypeInfo(
    use = JsonTypeInfo.Id.CLASS,
    include = JsonTypeInfo.As.WRAPPER_ARRAY
)
@JsonTypeName("OperatingHours")
public record HospitalOperatingHoursCache(
    List<HospitalOperatingHourResponse> operatingHourList
) {

    public HospitalOperatingHoursCache(List<HospitalOperatingHourResponse> operatingHourList) {
        this.operatingHourList = operatingHourList;
    }

}
