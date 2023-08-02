package com.refill.doctor.dto.response;

import com.refill.doctor.entity.Doctor;
import com.refill.doctor.entity.EducationBackground;
import com.refill.doctor.entity.MajorArea;
import java.util.List;
import javax.validation.constraints.NotNull;

public record DoctorResponse(
    @NotNull Long id,
    @NotNull String name,
    @NotNull String profileImg,
    @NotNull String licenseNumber,
    @NotNull String licenseImg,
    @NotNull String description,
    @NotNull List<MajorArea> majorAreas,
    @NotNull List<EducationBackground> educationBackgrounds
) {

    public DoctorResponse(Doctor doctor) {
        this(doctor.getId(),
            doctor.getName(),
            doctor.getProfileImg(),
            doctor.getLicenseNumber(),
            doctor.getLicenseImg(),
            doctor.getDescription(),
            doctor.getMajorAreas(),
            doctor.getEducationBackgrounds()
        );
    }
}
