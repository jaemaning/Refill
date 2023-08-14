package com.refill.report.service;

import com.refill.global.entity.Role;
import com.refill.global.exception.ErrorCode;
import com.refill.hospital.service.HospitalService;
import com.refill.member.exception.MemberException;
import com.refill.member.service.MemberService;
import com.refill.report.entity.Report;
import com.refill.report.entity.TargetType;
import com.refill.report.exception.ReportException;
import com.refill.report.repository.ReportRepository;
import com.refill.security.util.LoginInfo;
import java.util.List;
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
    private final MemberService memberService;
    private final HospitalService hospitalService;

    @Transactional(readOnly = true)
    public Page<Report> getReportReviews(Pageable pageable) {
        return reportRepository.findByTargetType(TargetType.REVIEW, pageable);
    }

    public void reportReview(Long reviewId, String content, LoginInfo loginInfo) {

        Role role = loginInfo.role();
        Long id;
        if (role.equals(Role.ROLE_MEMBER)) {
            id = memberService.findByLoginId(loginInfo.loginId()).getId();
        } else if (role.equals(Role.ROLE_HOSPITAL)) {
            id = hospitalService.findByLoginId(loginInfo.loginId())
                                .getId();
        } else {
            throw new MemberException(ErrorCode.USERNAME_NOT_FOUND);
        }

        Report report = Report.builder()
                              .reporterRole(loginInfo.role())
                              .reporterId(id)
                              .targetId(reviewId)
                              .content(content)
                              .targetType(TargetType.REVIEW).build();

        reportRepository.save(report);
    }

    public Report findById(Long reportId) {
        return reportRepository.findById(reportId).orElseThrow(()-> new ReportException(ErrorCode.REPORT_NOT_FOUND));
    }

    public void deleteReportById(Long reportId) {
        reportRepository.deleteById(reportId);
    }

    public void reportConsulting(Long consultingId, String content, LoginInfo loginInfo) {
        Role reporterRole = loginInfo.role();
        Long id;

        if(reporterRole.equals(Role.ROLE_MEMBER))  {
            id = memberService.findByLoginId(loginInfo.loginId()).getId();
        }
        else if(reporterRole.equals(Role.ROLE_HOSPITAL)){
            id = hospitalService.findByLoginId(loginInfo.loginId()).getId();
        } else {
            throw new MemberException(ErrorCode.USERNAME_NOT_FOUND);
        }

        Report report = Report.builder()
                              .reporterRole(loginInfo.role())
                              .reporterId(id)
                              .targetId(consultingId)
                              .content(content)
                              .targetType(TargetType.CONSULTING).build();

        reportRepository.save(report);
    }

    @Transactional(readOnly = true)
    public List<Report> getReportConsultings() {
        return reportRepository.getConsultingReportList(TargetType.CONSULTING);
    }
}
