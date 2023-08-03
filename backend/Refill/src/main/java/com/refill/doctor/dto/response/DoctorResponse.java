package com.refill.doctor.dto.response;

import com.refill.doctor.entity.Doctor;
import java.util.List;
import java.util.stream.Collectors;
import javax.validation.constraints.NotNull;

public record DoctorResponse(
    @NotNull Long id,
    @NotNull String name,
    @NotNull String profileImg,
    @NotNull String licenseNumber,
    @NotNull String licenseImg,
    @NotNull String description,
    @NotNull List<String> majorAreas,
    @NotNull List<String> educationBackgrounds
) {

    public DoctorResponse(Doctor doctor) {
        this(doctor.getId(),
            doctor.getName(),
            doctor.getProfileImg(),
            doctor.getLicenseNumber(),
            doctor.getLicenseImg(),
            doctor.getDescription(),
            doctor.getMajorAreas()
                  .stream()
                  .map(majorArea -> majorArea.getContent())
                  .collect(
                      Collectors.toList()),
            doctor.getEducationBackgrounds()
                  .stream()
                  .map(educationBackground -> educationBackground.getContent())
                  .collect(Collectors.toList())
        );
    }
}
