package com.refill.hospital.service;

import com.refill.hospital.entity.Hospital;
import com.refill.hospital.repository.HospitalRepository;
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
}
