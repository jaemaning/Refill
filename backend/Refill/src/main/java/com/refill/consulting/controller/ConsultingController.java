package com.refill.consulting.controller;

import com.refill.consulting.dto.response.ConsultingDetailResponse;
import com.refill.consulting.dto.response.ConsultingListResponse;
import com.refill.security.util.LoginInfo;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/v1/consulting")
@RestController
public class ConsultingController {

    @GetMapping("/doctor/{doctorId}")
    public ResponseEntity<String> getDoctorToken(@AuthenticationPrincipal LoginInfo loginInfo,@PathVariable Long doctorId) {
        log.debug("'{}' doctor request doctorToken", loginInfo.loginId());
        // 토큰 가져오기
        String token = "abcd";

        return ResponseEntity.ok().body(token);
    }

    @GetMapping("/member/{memberId}")
    public ResponseEntity<String> getMemberToken(@AuthenticationPrincipal LoginInfo loginInfo, @PathVariable Long memberId) {
        log.debug("'{}' member request doctorToken", loginInfo.loginId());
        // 토큰 가져오기
        String token = "abcd";

        return ResponseEntity.ok().body(token);
    }

    @GetMapping("/leave")
    public ResponseEntity<String> leaveCosult() {
        log.debug("Close Session");
        // 세션 닫기 & 상담 실행 여부 변경

        return ResponseEntity.ok().build();
    }

    @GetMapping("/")
    public ResponseEntity<List<ConsultingListResponse>> getConsultingList(@AuthenticationPrincipal LoginInfo loginInfo) {
        log.debug("'{}' member request consultingList", loginInfo.loginId());

        List<ConsultingListResponse> consultingList = new ArrayList<>();

        return ResponseEntity.ok().body(consultingList);
    }

    @GetMapping("/{consultingId}")
    public ResponseEntity<ConsultingDetailResponse> getDetailConsultingInfo(@AuthenticationPrincipal LoginInfo loginInfo, @PathVariable Long consultingId) {
        log.debug("'{}' member request detailconsulting", loginInfo.loginId());

        ConsultingDetailResponse consultingDetailResponse = new ConsultingDetailResponse();

        return ResponseEntity.ok().body(consultingDetailResponse);
    }
}
