package com.refill.review.entity;

import com.refill.doctor.entity.Doctor;
import com.refill.global.entity.BaseEntity;
import com.refill.hospital.entity.Hospital;
import com.refill.member.entity.Member;
import com.refill.review.dto.request.ReviewModifyRequest;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@ToString(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Builder
@Entity
public class Review extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "doctor_id")
    Doctor doctor;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "hospital_id")
    Hospital hospital;

    @Column(name = "score")
    Integer score;

    @Column(name = "content")
    String content;

    @Column(name = "is_blocked")
    Boolean isBlocked;

    public static Review from(Hospital hospital, Doctor doctor, Member member, Integer score, String content) {
        return Review.builder()
            .doctor(doctor)
            .member(member)
            .hospital(hospital)
            .score(score)
            .content(content)
            .isBlocked(false)
            .build();
    }
    public void update(ReviewModifyRequest reviewModifyRequest) {
        this.content = reviewModifyRequest.content();
        this.score = reviewModifyRequest.score();
    }
}
