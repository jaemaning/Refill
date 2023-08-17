package com.refill.doctor.repository;

import com.refill.doctor.entity.Doctor;
import com.refill.hospital.entity.Hospital;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DoctorRepository extends JpaRepository<Doctor, Long> {

    List<Doctor> findAllByHospital(Hospital hospital);


}
