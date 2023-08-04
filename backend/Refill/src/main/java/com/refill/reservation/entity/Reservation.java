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
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Entity
public class Reservation extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(nullable = false)
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(nullable = false)
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
