package com.refill.report.repository;

import com.refill.report.entity.Report;
import com.refill.report.entity.TargetType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReportRepository extends JpaRepository<Report, Long> {

    Page<Report> findByTargetType(TargetType targetType, Pageable pageable);
}
