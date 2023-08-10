package com.refill.consulting.entity;

import com.refill.doctor.entity.Doctor;
import com.refill.global.entity.BaseEntity;
import com.refill.member.entity.Member;
import com.refill.reservation.entity.Reservation;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Entity
public class Consulting extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(nullable = false)
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(nullable = false)
    private Doctor doctor;

    @OneToOne
    @JoinColumn(name = "reservation_id")
    private Reservation reservation; // reservation에 추가 예정

    @Column(nullable = false)
    private String sessionId;

    @Column(nullable = false)
    private String memberToken;

    @Column(nullable = false)
    private String doctorToken;

    @Column(nullable = false)
    private String screenShareToken;

    @Column(columnDefinition = "TEXT")
    private String consultingDetailInfo;

    @ColumnDefault("false")
    private boolean isExecuted;

    @Builder
    public Consulting(Member member, Doctor doctor, String sessionId, String memberToken, String doctorToken, String screenShareToken, Reservation reservation){
        this.member = member;
        this.doctor = doctor;
        this.sessionId = sessionId;
        this.memberToken = memberToken;
        this.doctorToken = doctorToken;
        this.screenShareToken =screenShareToken;
        this.reservation = reservation;
        this.isExecuted = false;
    }

    public void updateConsultingInfo(String consultingDetailInfo) {
        this.isExecuted = true;
        this.consultingDetailInfo = consultingDetailInfo;
    }
}
