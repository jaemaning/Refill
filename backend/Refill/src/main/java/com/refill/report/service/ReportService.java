package com.refill.report.service;

import com.refill.report.entity.Report;
import com.refill.report.repository.ReportRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
public class ReportService {

    private final ReportRepository reportRepository;

    @Transactional(readOnly = true)
    public Page<Report> getReportReviews(Pageable pageable) {
        return reportRepository.findByTargetTypeIsReview(pageable);
    }

}
