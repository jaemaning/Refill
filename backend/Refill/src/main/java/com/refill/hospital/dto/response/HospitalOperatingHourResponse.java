package com.refill.hospital.dto.response;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.refill.hospital.entity.HospitalOperatingHour;
import java.time.DayOfWeek;
import java.time.LocalTime;

public record HospitalOperatingHourResponse(
    DayOfWeek dayOfWeek,
    LocalTime startTime,
    LocalTime endTime
) {
    @JsonCreator
    public HospitalOperatingHourResponse(
        @JsonProperty("dayOfWeek") DayOfWeek dayOfWeek,
        @JsonProperty("startTime") LocalTime startTime,
        @JsonProperty("endTime") LocalTime endTime) {
        this.dayOfWeek = dayOfWeek;
        this.startTime = startTime;
        this.endTime = endTime;
    }
    public HospitalOperatingHourResponse(HospitalOperatingHour hospitalOperatingHour) {
        this(
            hospitalOperatingHour.getDayOfWeek(),
            hospitalOperatingHour.getStartTime(),
            hospitalOperatingHour.getEndTime()
        );
    }

}
