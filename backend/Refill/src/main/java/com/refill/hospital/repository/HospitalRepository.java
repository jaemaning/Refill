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


    List<Hospital> findByNameContaining(String hospitalName);

    List<Hospital> findByAddressContaining(String address);

    @Query("SELECT h FROM Hospital h WHERE h.latitude >= :sLat AND h.latitude <= :eLat AND h.longitude >= :sLng AND h.longitude <= :eLng")
    List<Hospital> findNearByHospitals(@Param("sLat") BigDecimal sLat, @Param("sLng") BigDecimal sLng, @Param("eLat") BigDecimal eLat, @Param("eLng") BigDecimal eLng);
}
