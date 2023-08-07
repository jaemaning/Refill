package com.refill.consulting.controller;

import com.refill.consulting.dto.request.ConsultingCloseRequest;
import com.refill.consulting.dto.response.ConsultingDetailResponse;
import com.refill.consulting.dto.response.ConsultingListResponse;
import com.refill.consulting.service.ConsultingService;
import com.refill.security.util.LoginInfo;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/v1/consulting")
@RestController
public class ConsultingController {

    private final ConsultingService consultingService;

    @GetMapping("/doctor/{reservationId}/{doctorId}")
    public ResponseEntity<List<String>> getDoctorToken(@AuthenticationPrincipal LoginInfo loginInfo, @PathVariable Long reservationId, @PathVariable Long doctorId) {
        // 로그인 정보, 의사 ID 받으면 겹치는거 아닌가 ?...
        log.debug("'{}' doctor request doctorToken", loginInfo.loginId());
        // 토큰 가져오기
        List<String> doctorConnection = consultingService.getDoctorConnectionToken(doctorId, reservationId);

        return ResponseEntity.ok().body(doctorConnection);
    }

    @GetMapping("/member/{reservationId}/{memberId}")
    public ResponseEntity<List<String>> getMemberToken(@AuthenticationPrincipal LoginInfo loginInfo, @PathVariable Long reservationId, @PathVariable Long memberId) {
        log.debug("'{}' member request doctorToken", loginInfo.loginId());
        // 토큰 가져오기

        return ResponseEntity.ok().body(consultingService.getMemberConnectionToken(memberId, reservationId));
    }

    @PostMapping ("/leave")
    public ResponseEntity<String> leaveConsult(@AuthenticationPrincipal LoginInfo loginInfo,@RequestPart("consultingCloseRequest") final
        ConsultingCloseRequest consultingCloseRequest) {
        // GET, POST 뭐할지 고민...
        log.debug("Close Session");
        // 세션 닫기 & 상담 실행 여부 변경
        consultingService.leaveSession(consultingCloseRequest.sessionId(),
            consultingCloseRequest.consultingDetailInfo());

        return ResponseEntity.ok().build();
    }

    @GetMapping("/{memberId}")
    public ResponseEntity<List<ConsultingListResponse>> getConsultingList(@AuthenticationPrincipal LoginInfo loginInfo, @PathVariable Long memberId) {
        log.debug("'{}' member request consultingList", loginInfo.loginId());

        List<ConsultingListResponse> consultingList = consultingService.getConsultingList(memberId);

        return ResponseEntity.ok().body(consultingList);
    }

    @GetMapping("/{consultingId}")
    public ResponseEntity<ConsultingDetailResponse> getDetailConsultingInfo(@AuthenticationPrincipal LoginInfo loginInfo, @PathVariable Long consultingId) {
        log.debug("'{}' member request detailConsultingInfo", loginInfo.loginId());

        ConsultingDetailResponse consultingDetailResponse = consultingService.getConsultingDetailInfo(consultingId);

        return ResponseEntity.ok().body(consultingDetailResponse);
    }
}
