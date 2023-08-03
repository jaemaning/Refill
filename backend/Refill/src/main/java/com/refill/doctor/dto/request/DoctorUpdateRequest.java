package com.refill.doctor.dto.request;

import java.util.List;
import javax.validation.constraints.NotNull;

public record DoctorUpdateRequest(
    @NotNull String description,
    @NotNull List<String> educationBackgrounds,
    @NotNull List<String> majorAreas
    ) {

}
