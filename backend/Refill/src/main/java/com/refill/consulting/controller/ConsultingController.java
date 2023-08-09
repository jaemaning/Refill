package com.refill.consulting.controller;

import com.refill.consulting.dto.request.ConsultingCloseRequest;
import com.refill.consulting.dto.response.ConnectionTokenResponse;
import com.refill.consulting.dto.response.ConsultingDetailResponse;
import com.refill.consulting.dto.response.ConsultingListResponse;
import com.refill.consulting.service.ConsultingService;
import com.refill.security.util.LoginInfo;
import io.openvidu.java.client.OpenViduHttpException;
import io.openvidu.java.client.OpenViduJavaClientException;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/v1/consulting")
@RestController
public class ConsultingController {

    private final ConsultingService consultingService;

    // 토큰 발급 테스트
    @GetMapping("/session/create")
    public ResponseEntity<String> createSessionTest(@AuthenticationPrincipal LoginInfo loginInfo)
        throws OpenViduJavaClientException, OpenViduHttpException {
        consultingService.createSession();
        return ResponseEntity.ok().build();
    }

    @GetMapping("/connection/{reservationId}")
    public ResponseEntity<ConnectionTokenResponse> getToken(@AuthenticationPrincipal LoginInfo loginInfo, @PathVariable Long reservationId) {

        log.debug("'{}' wants to get connction",loginInfo);

        return ResponseEntity.ok()
                             .body(consultingService.getConnectionToken(reservationId, loginInfo));
    }

    @PutMapping("/leave")
    public ResponseEntity<String> leaveConsult(@AuthenticationPrincipal LoginInfo loginInfo,@RequestPart("consultingCloseRequest") final ConsultingCloseRequest consultingCloseRequest) {
        log.debug("Close Session");
        // 세션 닫기 & 상담 실행 여부 변경
        consultingService.leaveSession(consultingCloseRequest);

        return ResponseEntity.ok().body("succcess");
    }

    @GetMapping("/{memberId}")
    public ResponseEntity<List<ConsultingListResponse>> getConsultingList(@AuthenticationPrincipal LoginInfo loginInfo, @PathVariable Long memberId) {
        log.debug("'{}' member request consultingList", loginInfo.loginId());

        List<ConsultingListResponse> consultingList = consultingService.getConsultingList(memberId);

        return ResponseEntity.ok().body(consultingList);
    }

    @GetMapping("/consultingDetail/{consultingId}")
    public ResponseEntity<ConsultingDetailResponse> getDetailConsultingInfo(@AuthenticationPrincipal LoginInfo loginInfo, @PathVariable Long consultingId) {
        log.debug("'{}' member request detailConsultingInfo", loginInfo.loginId());

        ConsultingDetailResponse consultingDetailResponse = consultingService.getConsultingDetailInfo(consultingId);

        return ResponseEntity.ok().body(consultingDetailResponse);
    }

}
