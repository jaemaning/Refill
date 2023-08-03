package com.refill.hospital.repository;

import com.refill.hospital.entity.Hospital;
import com.refill.hospital.entity.HospitalOperatingHour;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HospitalOperatingHourRepository extends JpaRepository<HospitalOperatingHour, Long> {

    List<HospitalOperatingHour> findAllByHospital(Hospital hospital);

}
