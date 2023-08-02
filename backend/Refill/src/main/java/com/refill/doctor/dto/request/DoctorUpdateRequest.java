package com.refill.doctor.dto.request;

import java.util.List;
import javax.validation.constraints.NotNull;

public record DoctorUpdateRequest(
    @NotNull String description,
    @NotNull List<String> educationBackgrounds,
    @NotNull List<String> majorAreas
    ) {

//    public DoctorUpdateRequest(Doctor doctor) {
//        this(
//            doctor.getDescription(),
//            doctor.getEducationBackgrounds()
//                  .stream()
//                  .map(educationBackground -> educationBackground.getContent())
//                  .collect(Collectors.toList()),
//            doctor.getMajorAreas()
//                  .stream()
//                  .map(majorArea -> majorArea.getContent())
//                  .collect(Collectors.toList())
//        );
//    }
}
