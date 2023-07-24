package com.refill.hospital.repository;

import com.refill.hospital.entity.Hospital;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HospitalRepository extends JpaRepository<Hospital, Long> {

    Optional<Hospital> findByLoginId(String loginId);

    boolean existsByLoginId(String loginId);

}
