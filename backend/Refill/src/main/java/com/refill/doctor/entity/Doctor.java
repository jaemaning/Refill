package com.refill.doctor.entity;

import com.refill.doctor.dto.request.DoctorJoinRequest;
import com.refill.doctor.dto.request.DoctorUpdateRequest;
import com.refill.global.entity.BaseEntity;
import com.refill.hospital.entity.Hospital;
import com.refill.reservation.entity.Reservation;
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
    Hospital hospital;

    @Cascade(CascadeType.ALL)
    @OneToMany(mappedBy = "doctor", orphanRemoval = true)
    List<MajorArea> majorAreas;

    @Cascade(CascadeType.ALL)
    @OneToMany(mappedBy = "doctor", orphanRemoval = true)
    List<EducationBackground> educationBackgrounds;

    @OneToMany(mappedBy = "doctor")
    List<Reservation> reservationList;

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
        this.educationBackgrounds.clear();
        this.educationBackgrounds.addAll(createEducationBackgrounds(doctorUpdateRequest));
        this.majorAreas.clear();
        this.majorAreas.addAll(createMajorAreas(doctorUpdateRequest));
    }

    private List<MajorArea> createMajorAreas(DoctorUpdateRequest doctorUpdateRequest) {
        return doctorUpdateRequest.majorAreas()
                                  .stream()
                                  .map(majorArea -> new MajorArea(this, majorArea))
                                  .collect(Collectors.toList());
    }

    private List<EducationBackground> createEducationBackgrounds(DoctorUpdateRequest doctorUpdateRequest) {
        return doctorUpdateRequest.educationBackgrounds()
                                  .stream()
                                  .map(
                                      educationBackground -> new EducationBackground(
                                          this, educationBackground))
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

    public void setHospital(Hospital hospital) {
        this.hospital = hospital;
        if (!hospital.getDoctors().contains(this)) {
            hospital.getDoctors().add(this);
        }
    }

    public void addReview(Review review){
        this.reviews.add(review);
        review.setDoctor(this);
    }


}
