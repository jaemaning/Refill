package com.refill.admin.controller;

import com.refill.admin.dto.response.ReportReviewResponse;
import com.refill.admin.dto.response.WaitingHospitalResponse;
import com.refill.admin.service.AdminService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
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

//    /* 신고 리뷰 조회 */
    @GetMapping("/reviews")
    public ResponseEntity<Page<ReportReviewResponse>> getReportReviews(Pageable pageable){
        //targetType이 review인것만 가져오기
        Page<ReportReviewResponse> reportReviewResponses = adminService.getReportReviews(pageable);
        return reportReviewResponses;
    }
//
//    /* 신고 리뷰 상세 조회 - 병원 controller review 조회로 대체 */

    /* 신고 리뷰 승인 */
    @PutMapping
    public ResponseEntity<String> acceptReportReview(){
        return null;
    }

    /* 신고 리뷰 반려 */
    @PutMapping
    public ResponseEntity<String> rejectReportReview(){
        return null;
    }




}
