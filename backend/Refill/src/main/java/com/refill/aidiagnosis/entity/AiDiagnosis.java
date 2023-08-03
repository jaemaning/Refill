package com.refill.aidiagnosis.entity;

import com.refill.global.entity.BaseEntity;
import com.refill.member.entity.Member;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Entity
public class AiDiagnosis extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn
    private Member member;

    @Column
    @Enumerated(EnumType.STRING)
    private HairLossType hairLossType;

    @Column
    private String surveyResult;

    @Column
    private Integer hairLossScore;

    @Column
    private String diagnosisImage;

    @Column(columnDefinition = "TEXT")
    private String diagnosisResult;

    @Builder
    public AiDiagnosis(Member member, HairLossType hairLossType, String surveyResult, Integer hairLossScore) {
        this.member = member;
        this.hairLossType = hairLossType;
        this.hairLossScore = hairLossScore;
        this.surveyResult = surveyResult;
    }

    public void updateFileAddress(String address) {
        this.diagnosisImage = address;
    }


}
