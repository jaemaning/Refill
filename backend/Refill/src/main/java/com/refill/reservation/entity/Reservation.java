package com.refill.reservation.entity;

import com.refill.doctor.entity.Doctor;
import com.refill.global.entity.BaseEntity;
import com.refill.member.entity.Member;
import java.time.LocalDateTime;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import lombok.Builder;
import lombok.Getter;
import org.hibernate.annotations.ColumnDefault;

@Getter
@Entity
public class Reservation extends BaseEntity {


    @Column(nullable = false)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn
    private Member member;

    @Column(nullable = false)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn
    private Doctor doctor;

    @Column(nullable = false)
    private LocalDateTime startDateTime;

    @Column(nullable = false)
    private LocalDateTime endDateTime;

    @ColumnDefault("false")
    @Column(nullable = false)
    private boolean isCanceled;

    @Column
    private String hairImage;

    @Column(columnDefinition = "TEXT")
    private String counselingDemands;

    @Builder
    public Reservation(Member member, Doctor doctor, LocalDateTime startDateTime, LocalDateTime endDateTime, String counselingDemands) {
        this.member = member;
        this.doctor = doctor;
        this.startDateTime = startDateTime;
        this.endDateTime = endDateTime;
        this.counselingDemands = counselingDemands;
        this.isCanceled = false;
    }
    public void updateFileAddress(String address) {
        this.hairImage = address;
    }
}
