package com.refill.review.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

@ToString(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@SuperBuilder
@Entity
public class Review extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "doctor_id")
    Doctor doctor;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
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

    @Column(name ="category")
    String category;

    public static Review from(Hospital hospital, Doctor doctor, Member member, Integer score, String content, String category) {
        return Review.builder()
            .doctor(doctor)
            .member(member)
            .hospital(hospital)
            .score(score)
            .content(content)
            .category(category)
            .isBlocked(false)
            .build();
    }
    public void update(ReviewModifyRequest reviewModifyRequest) {
        this.content = reviewModifyRequest.content();
        this.score = reviewModifyRequest.score();
    }

    public void setHospital(Hospital hospital) {
        this.hospital = hospital;
        if(!hospital.getReviews()
                    .contains(this)){
            hospital.getReviews()
                    .add(this);
        }
    }

    public void setDoctor(Doctor doctor) {
        this.doctor = doctor;
        if (!doctor.getReviews().contains(this)) {
            doctor.getReviews().add(this);
        }
    }
}
