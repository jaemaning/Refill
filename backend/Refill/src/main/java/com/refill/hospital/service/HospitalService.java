package com.refill.hospital.service;

import com.refill.global.exception.ErrorCode;
import com.refill.hospital.entity.Hospital;
import com.refill.hospital.repository.HospitalRepository;
import com.refill.member.exception.MemberException;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class HospitalService {

    private final HospitalRepository hospitalRepository;

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

    @Transactional(readOnly = true)
    public Hospital findByLoginId(String loginId) {
        return hospitalRepository.findByLoginId(loginId)
                                 .orElseThrow(
                                     () -> new MemberException(ErrorCode.USERNAME_NOT_FOUND));
    }

    @Transactional(readOnly = true)
    public Hospital findByEmail(String email) {
        return hospitalRepository.findByEmail(email)
                                 .orElseThrow(
                                     () -> new MemberException(ErrorCode.USERNAME_NOT_FOUND));
    }

    @Transactional(readOnly = true)
    public Hospital findByLoginIdAndEmail(String loginId, String email) {
        return hospitalRepository.findByLoginIdAndEmail(loginId, email)
                                 .orElseThrow(
                                     () -> new MemberException(ErrorCode.USERNAME_NOT_FOUND));
    }

    @Transactional(readOnly = true)
    public List<Hospital> findAll() {
        return hospitalRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Hospital findById(Long id) {
        return hospitalRepository.findById(id)
                                 .orElseThrow(
                                     () -> new MemberException(ErrorCode.USERNAME_NOT_FOUND));

    }

    @Transactional
    public void delete(Long id) {
        Hospital hospital = findById(id);
        hospitalRepository.delete(hospital);
    }
}
