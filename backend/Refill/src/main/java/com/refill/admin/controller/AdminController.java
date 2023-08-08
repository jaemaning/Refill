package com.refill.admin.controller;

import com.refill.admin.dto.response.ReportReviewResponse;
import com.refill.admin.dto.response.WaitingHospitalResponse;
import com.refill.admin.service.AdminService;
import com.refill.security.util.LoginInfo;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/v1/admin")
@RestController
public class AdminController {

    private final AdminService adminService;

    @GetMapping("/hospitals")
    public ResponseEntity<List<WaitingHospitalResponse>> showWaitingHospitalList() {

        log.debug("admin request waitingHospitalList");
        List<WaitingHospitalResponse> waitingHospitalList = adminService.findHospitalsByWaiting();

        return ResponseEntity.ok().body(waitingHospitalList);
    }

    @GetMapping("/hospitals/accept/{id}")
    public ResponseEntity<String> acceptHospital(@PathVariable("id") Long hospitalId) {

        log.debug("'{}' hospital accepted by admin", hospitalId);
        String message = adminService.acceptHospital(hospitalId);

        return ResponseEntity.ok().body(message);
    }

    @GetMapping("/hospitals/reject/{id}")
    public ResponseEntity<String> rejectHospital(@PathVariable("id") Long hospitalId) {

        log.debug("'{}' hospital rejected by admin", hospitalId);
        String message = adminService.rejectHospital(hospitalId);

        return ResponseEntity.ok().body(message);
    }

    /* 신고 리뷰 조회 */
    @GetMapping("/reviews")
    public ResponseEntity<Page<ReportReviewResponse>> getReportReviews(Pageable pageable){
        Page<ReportReviewResponse> reportReviewResponses = adminService.getReportReviews(pageable);
        return ResponseEntity.ok().body(reportReviewResponses);
    }
    /* 신고 리뷰 상세 조회 - review 도메인 단건 조회로 대체 가능 */

    /* 신고 리뷰 승인 - 리뷰 삭제 처리 후 report 삭제 */
    @DeleteMapping("/reviews/accept/{reportId}")
    public ResponseEntity<String> acceptReportReview(@PathVariable Long reportId, @AuthenticationPrincipal
        LoginInfo loginInfo){
        String message = adminService.acceptReportReview(reportId, loginInfo);
        return ResponseEntity.ok().body(message);
    }

    /* 신고 리뷰 반려 - 리뷰 삭제하지 않고 report 삭제 */
    @DeleteMapping("/reviews/reject/{reportId}")
    public ResponseEntity<String> rejectReportReview(@PathVariable Long reportId){
        String message = adminService.rejectReportReview(reportId);
        return ResponseEntity.ok().body(message);
    }




}
