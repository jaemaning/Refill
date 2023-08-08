package com.refill.report.entity;

import com.refill.global.entity.BaseEntity;
import com.refill.global.entity.Role;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

@Getter
@ToString(callSuper = true)
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class Report extends BaseEntity {

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    Role reporterRole;

    @Column(nullable = false)
    Long reporterId;

    @Column(nullable = false)
    Long targetId;

    @Column(nullable = false)
    String content;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    TargetType targetType;
}
