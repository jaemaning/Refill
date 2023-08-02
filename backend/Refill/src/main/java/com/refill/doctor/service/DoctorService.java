package com.refill.doctor.service;

import com.refill.doctor.entity.Doctor;
import com.refill.doctor.repository.DoctorRepository;
import com.refill.global.exception.ErrorCode;
import com.refill.member.exception.MemberException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class DoctorService {
    private final DoctorRepository doctorRepository;

    public void deleteById(Long doctorId) {
        doctorRepository.deleteById(doctorId);
    }

    public Doctor findById(Long doctorId) {
        return doctorRepository.findById(doctorId)
                           .orElseThrow(()->new MemberException(ErrorCode.USERNAME_NOT_FOUND));
    }
}
