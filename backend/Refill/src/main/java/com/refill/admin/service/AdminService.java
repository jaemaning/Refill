package com.refill.admin.service;

import com.refill.admin.dto.response.ReportReviewResponse;
import com.refill.admin.dto.response.WaitingHospitalResponse;
import com.refill.global.entity.Message;
import com.refill.global.entity.Role;
import com.refill.global.entity.UserInfo;
import com.refill.global.exception.ErrorCode;
import com.refill.hospital.entity.Hospital;
import com.refill.hospital.service.HospitalService;
import com.refill.member.exception.MemberException;
import com.refill.member.service.MemberService;
import com.refill.report.entity.Report;
import com.refill.report.service.ReportService;
import com.refill.review.entity.Review;
import com.refill.review.exception.ReviewException;
import com.refill.review.service.ReviewService;
import com.refill.security.util.LoginInfo;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class AdminService {

    private final HospitalService hospitalService;
    private final ReviewService reviewService;
    private final ReportService reportService;
    private final MemberService memberService;

    public List<WaitingHospitalResponse> findHospitalsByWaiting() {

        return hospitalService.findAll().stream()
                              .filter(hospital -> hospital.getRole() == Role.ROLE_GUEST)
                              .map(WaitingHospitalResponse::new)
                              .toList();
    }


    @Transactional
    public String acceptHospital(Long hospitalId) {

        Hospital hospital = hospitalService.findById(hospitalId);

        if(hospital.getRole() != Role.ROLE_GUEST) {
            throw new MemberException(ErrorCode.ALREADY_ACCEPT);
        }

        hospital.acceptHospital();

        return Message.ACCEPT_HOSPITAL.getMessage();
    }

    @Transactional
    public String rejectHospital(Long hospitalId) {

        Hospital hospital = hospitalService.findById(hospitalId);

        if(hospital.getRole() != Role.ROLE_GUEST) {
            throw new MemberException(ErrorCode.ALREADY_ACCEPT);
        }

        hospitalService.delete(hospitalId);

        return Message.REJECT_HOSPITAL.getMessage();
    }

    @Transactional(readOnly = true)
    public Page<ReportReviewResponse> getReportReviews(Pageable pageable) {
        Page<Report> reportReviews = reportService.getReportReviews(pageable);

        List<ReportReviewResponse> list = reportReviews.getContent()
                                                       .stream()
                                                       .map(this::buildReportReviewResponse)
                                                       .collect(Collectors.toList());

        return new PageImpl<>(list, pageable, reportReviews.getTotalElements());
    }

    private ReportReviewResponse buildReportReviewResponse(Report reportReview) {
        UserInfo userInfo = getUserInfoBasedOnRole(reportReview);
        Review review = reviewService.findById(reportReview.getTargetId());
        return new ReportReviewResponse(reportReview, userInfo, review);
    }

    private UserInfo getUserInfoBasedOnRole(Report reportReview) {
        switch (reportReview.getReporterRole()) {
            case ROLE_MEMBER:
                return memberService.findById(reportReview.getReporterId());
            case ROLE_HOSPITAL:
                return hospitalService.findById(reportReview.getReporterId());
            default:
                throw new ReviewException(ErrorCode.UNAUTHORIZED_REQUEST);
        }
    }


    @Transactional
    public String acceptReportReview(Long reportId, LoginInfo loginInfo) {
        Report report = reportService.findById(reportId);
        reviewService.deleteReviewById(report.getTargetId(), loginInfo);
        reportService.deleteReportById(reportId);
        return Message.ACCEPT_REPORT_REVIEW.getMessage();
    }

    @Transactional
    public String rejectReportReview(Long reportId) {
        reportService.deleteReportById(reportId);
        return Message.REJECT_REPORT_REVIEW.getMessage();
    }
}
