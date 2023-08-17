package com.refill.doctor.service;

import com.refill.doctor.dto.response.DoctorResponse;
import com.refill.doctor.entity.Doctor;
import com.refill.doctor.repository.DoctorRepository;
import com.refill.global.exception.ErrorCode;
import com.refill.hospital.entity.Hospital;
import com.refill.member.exception.MemberException;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class DoctorService {

    private final DoctorRepository doctorRepository;

    public void deleteById(Long doctorId) {
        doctorRepository.deleteById(doctorId);
    }

    public Doctor findById(Long doctorId) {
        return doctorRepository.findById(doctorId)
                               .orElseThrow(
                                   () -> new MemberException(ErrorCode.USERNAME_NOT_FOUND));
    }

    public Doctor save(Doctor doctor) {
        return doctorRepository.save(doctor);
    }

    @Transactional(readOnly = true)
    public List<DoctorResponse> findAllByHospital(Hospital hospital) {
        return doctorRepository.findAllByHospital(hospital)
                               .stream()
                               .map(DoctorResponse::new)
                               .collect(Collectors.toList());
    }
}
