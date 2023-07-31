package com.refill.hospital.repository;

import com.refill.hospital.entity.Hospital;
import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface HospitalRepository extends JpaRepository<Hospital, Long> {

    Optional<Hospital> findByLoginId(String loginId);
    Optional<Hospital> findByEmail(String email);
    Optional<Hospital> findByLoginIdAndEmail(String loginId, String email);
    boolean existsByLoginId(String loginId);
    boolean existsByEmail(String email);

    List<Hospital> findByNameContainingOrAddressContaining(String name, String address);

    @Query(value = "SELECT * FROM Hospital WHERE (6371 * acos(cos(radians(:latitude)) * cos(radians(Hospital.latitude)) * cos(radians(Hospital.longitude) - radians(:longitude)) + sin(radians(:latitude)) * sin(radians(Hospital.latitude)))) < :radius", nativeQuery = true)
    List<Hospital> findNearByHospitals(@Param("latitude") BigDecimal latitude, @Param("longitude") BigDecimal longitude, @Param("radius") Double radius);

}
