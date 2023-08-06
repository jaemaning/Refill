package com.refill.hospital.entity;

import com.refill.global.entity.BaseEntity;
import com.refill.hospital.dto.request.HospitalOperatingHoursRequest;
import java.time.DayOfWeek;
import java.time.LocalTime;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class HospitalOperatingHour extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn
    private Hospital hospital;

    @Enumerated(EnumType.STRING)
    @Column
    private DayOfWeek dayOfWeek;

    @Column
    private LocalTime startTime;

    @Column
    private LocalTime endTime;

    public static HospitalOperatingHour from(HospitalOperatingHoursRequest hospitalOperatingHoursRequest, Hospital hospital) {
        return HospitalOperatingHour.builder()
                                    .dayOfWeek(hospitalOperatingHoursRequest.dayOfWeek())
                                    .startTime(hospitalOperatingHoursRequest.startTime())
                                    .endTime(hospitalOperatingHoursRequest.endTime())
                                    .hospital(hospital)
                                    .build();
    }

}
