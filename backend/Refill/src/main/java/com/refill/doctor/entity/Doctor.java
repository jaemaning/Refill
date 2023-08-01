package com.refill.doctor.entity;

import com.refill.global.entity.BaseEntity;
import com.refill.hospital.entity.Hospital;
import com.refill.review.entity.Review;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.annotations.DynamicUpdate;

@Getter
@ToString(callSuper = true)
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@DynamicUpdate
public class Doctor extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "hospital_id")
    Hospital hospital;

    @OneToMany(mappedBy = "doctor")
    List<MajorArea> majorAreas;

    @OneToMany(mappedBy = "doctor")
    List<EducationBackground> educationBackgrounds;

    @OneToMany(mappedBy = "doctor")
    List<Review> reviews;

    @Column(nullable = false)
    String name;

    @Column
    String photo;

    @Column(nullable = false)
    String licenseNumber;

    @Column(nullable = false)
    String licensePhoto;

    @Column(nullable = false)
    String description;

}
