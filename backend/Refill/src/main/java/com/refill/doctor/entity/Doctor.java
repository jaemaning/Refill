package com.refill.doctor.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.refill.doctor.dto.request.DoctorJoinRequest;
import com.refill.doctor.dto.request.DoctorUpdateRequest;
import com.refill.global.entity.BaseEntity;
import com.refill.hospital.entity.Hospital;
import com.refill.review.entity.Review;
import java.util.List;
import java.util.stream.Collectors;
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
import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.CascadeType;
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
    @JsonBackReference
    Hospital hospital;

    @Cascade(CascadeType.ALL)
    @OneToMany(mappedBy = "doctor")
    List<MajorArea> majorAreas;

    @Cascade(CascadeType.ALL)
    @OneToMany(mappedBy = "doctor")
    List<EducationBackground> educationBackgrounds;

    @OneToMany(mappedBy = "doctor")
    List<Review> reviews;

    @Column(nullable = false)
    String name;

    @Column
    String profileImg;

    @Column(nullable = false)
    String licenseNumber;

    @Column(nullable = false)
    String licenseImg;

    @Column(nullable = false)
    String description;

    public static Doctor from(DoctorJoinRequest doctorJoinRequest, Hospital hospital) {
        return Doctor.builder()
                     .hospital(hospital)
                     .name(doctorJoinRequest.name())
                     .description(doctorJoinRequest.description())
                     .licenseNumber(doctorJoinRequest.licenseNumber())
                     .build();
    }

    public void update(DoctorUpdateRequest doctorUpdateRequest) {
        this.description = doctorUpdateRequest.description();
        this.educationBackgrounds = doctorUpdateRequest.educationBackgrounds()
                                                       .stream()
                                                       .map(
                                                           educationBackground -> new EducationBackground(
                                                               this, educationBackground))
                                                       .collect(Collectors.toList());
        this.majorAreas = doctorUpdateRequest.majorAreas()
                                             .stream()
                                             .map(majorArea -> new MajorArea(this, majorArea))
                                             .collect(Collectors.toList());
    }

    public void updateProfileAddress(String profileAddress) {
        this.profileImg = profileAddress;
    }

    public void registProfileAddress(String profileAddress) {
        this.profileImg = profileAddress;
    }

    public void registLicenseAddress(String licenseAddress) {
        this.licenseImg = licenseAddress;
    }
}
