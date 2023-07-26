package com.refill.hospital.service;

import com.refill.global.exception.ErrorCode;
import com.refill.hospital.entity.Hospital;
import com.refill.hospital.repository.HospitalRepository;
import com.refill.member.exception.MemberException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class HospitalService {

    private final HospitalRepository hospitalRepository;

    public void testCreate() {
        hospitalRepository.save(Hospital.builder()
                                        .address("귤민이네집")
                                        .loginId("hospital01")
                                        .build());
    }

    @Transactional(readOnly = true)
    public boolean existsByLoginId(String loginId) {
        return hospitalRepository.existsByLoginId(loginId);
    }

    @Transactional(readOnly = true)
    public boolean existsByEmail(String email) {
        return hospitalRepository.existsByEmail(email);
    }

    @Transactional
    public Long save(Hospital hospital) {
        return hospitalRepository.save(hospital)
                                 .getId();
    }

    @Transactional
    public Hospital findByLoginId(String loginId) {
        return hospitalRepository.findByLoginId(loginId)
                                 .orElseThrow(() -> new MemberException(
                                     ErrorCode.USERNAME_NOT_FOUND.getCode(),
                                     ErrorCode.USERNAME_NOT_FOUND,
                                     ErrorCode.USERNAME_NOT_FOUND.getMessage()
                                 ));
    }
}
