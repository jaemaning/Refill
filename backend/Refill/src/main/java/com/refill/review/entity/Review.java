package com.refill.review.entity;

import com.refill.global.entity.BaseEntity;
import com.refill.hospital.entity.Hospital;
import com.refill.member.entity.Member;
import javax.persistence.Column;
import javax.persistence.Entity;
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

    @ManyToOne
    @JoinColumn(name = "hospital_id")
    Hospital hospital;

    @ManyToOne
    @JoinColumn(name = "member_id")
    Member member;

    @Column(name = "score")
    Integer score;

    @Column(name = "content")
    String content;

    @Column(name = "is_blocked")
    Boolean isBlocked;
}
