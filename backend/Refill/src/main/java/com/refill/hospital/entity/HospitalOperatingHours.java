package com.refill.hospital.entity;

import com.refill.global.entity.BaseEntity;
import java.time.DayOfWeek;
import java.time.LocalTime;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import lombok.Getter;

@Getter
@Entity
public class HospitalOperatingHours extends BaseEntity {

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

}
