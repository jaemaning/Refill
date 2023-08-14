package com.refill.report.repository;

import com.refill.report.entity.Report;
import com.refill.report.entity.TargetType;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ReportRepository extends JpaRepository<Report, Long> {

    Page<Report> findByTargetType(TargetType targetType, Pageable pageable);

    @Query("SELECT r FROM Report r WHERE r.targetType = :targetType")
    List<Report> getConsultingReportList(@Param("targetType") TargetType targetType);
}
