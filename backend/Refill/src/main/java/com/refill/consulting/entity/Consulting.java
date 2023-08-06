package com.refill.consulting.entity;

import com.refill.doctor.entity.Doctor;
import com.refill.global.entity.BaseEntity;
import com.refill.member.entity.Member;
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
public class Consulting extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(nullable = false)
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(nullable = false)
    private Doctor doctor;

    @Column(nullable = false)
    private String  sessionId;

    @ColumnDefault("false")
    @Column(nullable = false)
    private Boolean isExecuted;

    @Column(nullable = false)
    private String memberToken;

    @Column(nullable = false)
    private String doctorToken;

    @Column
    private String consultingDetail;

    @Builder
    public Consulting(Member member, Doctor doctor, String sessionId, String memberToken, String doctorToken) {
        this.member = member;
        this.doctor = doctor;
        this.sessionId = sessionId;
        this.memberToken = memberToken;
        this.doctorToken = doctorToken;
        this.isExecuted = false;
    }
    public void closeConsulting() {
        this.isExecuted = true;
        // 소견서 저장 -> 이미지 파일 받아서 S3 접근하여 주조 변환 후 저장
        // 세션 종료 -> API 쏘기 (+ 실행 위치 변경할 수도)
    }
}
