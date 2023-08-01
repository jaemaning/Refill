package com.refill.admin.service;

import com.refill.admin.dto.response.WaitingHospitalResponse;
import com.refill.global.entity.Message;
import com.refill.global.entity.Role;
import com.refill.global.exception.ErrorCode;
import com.refill.hospital.entity.Hospital;
import com.refill.hospital.service.HospitalService;
import com.refill.member.exception.MemberException;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class AdminService {

    private final HospitalService hospitalService;

    public List<WaitingHospitalResponse> findHospitalsByWaiting() {

        return hospitalService.findAll().stream()
                              .filter(hospital -> hospital.getRole() == Role.ROLE_GUEST)
                              .map(WaitingHospitalResponse::new)
                              .toList();
    }

    public String acceptHospital(Long hospitalId) {

        Hospital hospital = hospitalService.findById(hospitalId);

        if(hospital.getRole() != Role.ROLE_GUEST) {
            throw new MemberException(ErrorCode.ALREADY_ACCEPT);
        }

        hospital.acceptHospital();

        return Message.ACCEPT_HOSPITAL.getMessage();
    }

    public String rejectHospital(Long hospitalId) {

        Hospital hospital = hospitalService.findById(hospitalId);

        if(hospital.getRole() != Role.ROLE_GUEST) {
            throw new MemberException(ErrorCode.ALREADY_ACCEPT);
        }

        hospitalService.delete(hospitalId);

        return Message.REJECT_HOSPITAL.getMessage();

    }
}
