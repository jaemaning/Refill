package com.refill.hospital.dto.response;

import com.refill.hospital.entity.HospitalOperatingHour;
import java.time.DayOfWeek;
import java.time.LocalTime;

public record HospitalOperatingHourResponse(
    DayOfWeek dayOfWeek,
    LocalTime startTime,
    LocalTime endTime
) {
    public HospitalOperatingHourResponse(HospitalOperatingHour hospitalOperatingHour) {
        this(
            hospitalOperatingHour.getDayOfWeek(),
            hospitalOperatingHour.getStartTime(),
            hospitalOperatingHour.getEndTime()
        );
    }

}
