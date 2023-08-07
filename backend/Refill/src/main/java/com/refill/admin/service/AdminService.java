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
import com.refill.report.entity.ReporterType;
import com.refill.report.service.ReportService;
import com.refill.review.entity.Review;
import com.refill.review.service.ReviewService;
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

    public Page<ReportReviewResponse> getReportReviews(Pageable pageable) {
//        Page<Report> reportReviews = reportService.getReportReviews(pageable);
//        UserInfo userInfo = null;
//        Review review;
//        List<ReportReviewResponse> list = new ArrayList<>();
//        for (Report reportReview : reportReviews) {
//            if (reportReview.getReporterType()
//                            .equals(ReporterType.MEMBER)) {
//                userInfo = memberService.findById(reportReview.getReporterId());
//            } else if (reportReview.getReporterType()
//                                   .equals(ReporterType.HOSPITAL)) {
//                userInfo = hospitalService.findById(reportReview.getReporterId());
//            }
//            review = reviewService.findById(reportReview.getTargetId());
//            list.add(new ReportReviewResponse(reportReview, userInfo, review));
//        }
//        return new PageImpl<>(list, pageable, reportReviews.getTotalElements());
        Page<Report> reportReviews = reportService.getReportReviews(pageable);

        List<ReportReviewResponse> list = reportReviews.getContent()
                                                       .stream()
                                                       .map(reportReview -> {
                                                           UserInfo userInfo;
                                                           if (reportReview.getReporterType().equals(ReporterType.MEMBER)) {
                                                               userInfo = memberService.findById(reportReview.getReporterId());
                                                           } else if (reportReview.getReporterType().equals(ReporterType.HOSPITAL)) {
                                                               userInfo = hospitalService.findById(reportReview.getReporterId());
                                                           } else {
                                                               throw new IllegalArgumentException("Unexpected ReporterType: " + reportReview.getReporterType());
                                                           }

                                                           Review review = reviewService.findById(reportReview.getTargetId());
                                                           return new ReportReviewResponse(reportReview, userInfo, review);
                                                       })
                                                       .collect(Collectors.toList());

        return new PageImpl<>(list, pageable, reportReviews.getTotalElements());
    }
}
