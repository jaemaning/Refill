package com.refill.review.repository;

import com.refill.hospital.entity.Hospital;
import com.refill.review.entity.Review;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewRepository extends JpaRepository<Review, Long> {

    List<Review> findAllByHospital(Hospital hospital);
}
