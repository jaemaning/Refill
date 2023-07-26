package com.refill.hospital.repository;

import com.refill.hospital.entity.Hospital;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HospitalRepository extends JpaRepository<Hospital, Long> {

    Optional<Hospital> findByLoginId(String loginId);
    Optional<Hospital> findByEmail(String email);
    Optional<Hospital> findByLoginIdAndEmail(String loginId, String email);
    boolean existsByLoginId(String loginId);
    boolean existsByEmail(String email);
}
