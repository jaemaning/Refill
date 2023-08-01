package com.refill.doctor.dto.response;

import com.refill.doctor.entity.Doctor;
import com.refill.doctor.entity.EducationBackground;
import com.refill.doctor.entity.MajorArea;
import java.util.List;
import javax.validation.constraints.NotNull;

public record DoctorResponse(
    @NotNull Long id,
    @NotNull String name,
    @NotNull String photo,
    @NotNull String licenseNumber,
    @NotNull String licensePhoto,
    @NotNull String description,
    @NotNull List<MajorArea> majorAreas,
    @NotNull List<EducationBackground> educationBackgrounds
) {

    public DoctorResponse(Doctor doctor) {
        this(doctor.getId(),
            doctor.getName(),
            doctor.getPhoto(),
            doctor.getLicenseNumber(),
            doctor.getLicensePhoto(),
            doctor.getDescription(),
            doctor.getMajorAreas(),
            doctor.getEducationBackgrounds()
        );
    }
}
