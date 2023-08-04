package com.refill.hospital.dto.request;

import java.time.DayOfWeek;
import java.time.LocalTime;

public record HospitalOperatingHoursRequest(
    DayOfWeek dayOfWeek,
    LocalTime startTime,
    LocalTime endTime
) {

}
