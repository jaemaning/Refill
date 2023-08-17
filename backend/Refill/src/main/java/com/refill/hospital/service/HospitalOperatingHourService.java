package com.refill.hospital.service;

import com.refill.global.entity.Role;
import com.refill.global.exception.ErrorCode;
import com.refill.hospital.dto.request.HospitalOperatingHoursRequest;
import com.refill.hospital.dto.response.HospitalDetailResponse;
import com.refill.hospital.dto.response.HospitalOperatingHourResponse;
import com.refill.hospital.entity.Hospital;
import com.refill.hospital.entity.HospitalOperatingHour;
import com.refill.hospital.repository.HospitalOperatingHourRepository;
import com.refill.member.exception.MemberException;
import com.refill.security.util.LoginInfo;
import java.time.DayOfWeek;
import java.time.LocalTime;
import java.util.Arrays;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class HospitalOperatingHourService {

    private final HospitalService hospitalService;
    private final HospitalOperatingHourRepository hospitalOperatingHourRepository;


    @Transactional
    public void saveOperatingHours(List<HospitalOperatingHoursRequest> hospitalOperatingHoursRequestList, LoginInfo loginInfo) {

        if (loginInfo.role() == Role.ROLE_MEMBER) {
            throw new MemberException(ErrorCode.UNAUTHORIZED_REQUEST);
        }

        Hospital hospital = hospitalService.findByLoginId(loginInfo.loginId());

        hospitalOperatingHoursRequestList.stream()
                                         .map(x -> HospitalOperatingHour.from(x, hospital))
                                         .forEach(hospitalOperatingHourRepository::save);

    }

    @Transactional(readOnly = true)
    public List<HospitalOperatingHourResponse> getOperatingHours(Long id) {

        Hospital hospital = hospitalService.findById(id);

        return hospitalOperatingHourRepository.findAllByHospital(hospital)
                                              .stream()
                                              .map(HospitalOperatingHourResponse::new)
                                              .toList();
    }

    @Transactional(readOnly = true)
    public HospitalDetailResponse getDetailHospitalInfo(Long id) {

        Hospital hospital = hospitalService.findById(id);
        List<HospitalOperatingHourResponse> operatingHourResponses = getOperatingHours(id);

        return new HospitalDetailResponse(hospital, operatingHourResponses);

    }

    @Transactional
    public void generateHours(Long id) {

        Hospital hospital = hospitalService.findById(id);

        LocalTime startTime = LocalTime.of(9, 0);
        LocalTime endTime = LocalTime.of(19, 0);

        DayOfWeek[] weeks = DayOfWeek.values();

        Arrays.stream(weeks)
            .map(x -> new HospitalOperatingHoursRequest(x, startTime, endTime))
            .map(y -> HospitalOperatingHour.from(y, hospital))
            .forEach(hospitalOperatingHourRepository::save);

    }
}
