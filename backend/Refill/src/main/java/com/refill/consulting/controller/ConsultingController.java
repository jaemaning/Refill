package com.refill.consulting.controller;

import com.refill.consulting.dto.request.ConsultingCloseRequest;
import com.refill.consulting.dto.request.ConsultingReportRequest;
import com.refill.consulting.dto.response.ConnectionTokenResponse;
import com.refill.consulting.dto.response.ConsultingDetailResponse;
import com.refill.consulting.dto.response.ConsultingListResponse;
import com.refill.consulting.service.ConsultingService;
import com.refill.report.entity.Report;
import com.refill.security.util.LoginInfo;
import io.openvidu.java.client.OpenViduHttpException;
import io.openvidu.java.client.OpenViduJavaClientException;
import java.util.List;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.java.Log;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/v1/consulting")
@RestController
public class ConsultingController {

    private final ConsultingService consultingService;

    /* 입장 토큰 받아오기 */
    @GetMapping("/connection/{reservationId}")
    public ResponseEntity<ConnectionTokenResponse> getToken(@AuthenticationPrincipal LoginInfo loginInfo, @PathVariable Long reservationId) {

        log.info("'{}' wants to get connction",loginInfo);

        ConnectionTokenResponse connectionTokenResponse = consultingService.getConnectionToken(reservationId, loginInfo);

        return ResponseEntity.ok()
                             .body(connectionTokenResponse);
    }

    /* 세션 종료 및 상담 소견 내용 저장 */
    @PostMapping("/leave")
    public ResponseEntity<String> leaveConsult(@AuthenticationPrincipal LoginInfo loginInfo,@RequestBody final ConsultingCloseRequest consultingCloseRequest)
        throws OpenViduJavaClientException, OpenViduHttpException {

        log.info("Close Session");
        // 세션 닫기 & 상담 실행 여부 변경
        consultingService.leaveSession(consultingCloseRequest ,loginInfo);

        return ResponseEntity.ok().body("succcess");
    }

    /* 상담 내역 받아오기 */
    @GetMapping("/{loginId}")
    public ResponseEntity<List<ConsultingListResponse>> getConsultingList(@AuthenticationPrincipal LoginInfo loginInfo, @PathVariable String loginId) {
        log.info("'{}' member request consultingList", loginInfo.loginId());

        List<ConsultingListResponse> consultingList = consultingService.getConsultingList(loginId);

        return ResponseEntity.ok().body(consultingList);
    }

    /* 상담 상세 내역 받아오기 */
    @GetMapping("/consultingDetail/{consultingId}")
    public ResponseEntity<ConsultingDetailResponse> getDetailConsultingInfo(@AuthenticationPrincipal LoginInfo loginInfo, @PathVariable Long consultingId) {
        log.info("'{}' member request detailConsultingInfo", loginInfo.loginId());

        ConsultingDetailResponse consultingDetailResponse = consultingService.getConsultingDetailInfo(consultingId);

        return ResponseEntity.ok().body(consultingDetailResponse);
    }

    /* 상담 신고 하기 */
    @PostMapping("/report/{consultingId}")
    public ResponseEntity<String> reportConsulting(@AuthenticationPrincipal LoginInfo loginInfo, @PathVariable Long consultingId, @RequestBody
        ConsultingReportRequest consultingReportRequest) {

        log.info("consultingId: {}, loginInfo: {}, content: {}", consultingId, loginInfo, consultingReportRequest.content());

        consultingService.reportConsulting(consultingId, consultingReportRequest.content(),loginInfo);

        return ResponseEntity.ok().build();
    }

    /* 신고된 상담 조회 */
    @GetMapping("/report")
    public ResponseEntity<List<Report>>  consultingReportList (@AuthenticationPrincipal LoginInfo loginInfo) {

        log.info("request cnosultingReportList");
        List<Report> reportList = consultingService.getConsultingReportList(loginInfo);

        return  ResponseEntity.ok().body(reportList);
    }
}
