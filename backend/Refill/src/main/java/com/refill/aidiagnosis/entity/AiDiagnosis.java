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
import lombok.Getter;

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
    private String diagnosisImage;

    @Column(columnDefinition = "TEXT")
    private String diagnosisResult;


}
