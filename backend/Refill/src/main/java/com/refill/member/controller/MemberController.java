package com.refill.member.controller;

import com.refill.aidiagnosis.dto.response.AiDiagnosisListResponse;
import com.refill.aidiagnosis.service.AiDiagnosisService;
import com.refill.consulting.dto.response.ConsultingListResponse;
import com.refill.consulting.service.ConsultingService;
import com.refill.member.dto.request.MemberInfoUpdateRequest;
import com.refill.member.dto.request.MemberPasswordUpdateRequest;
import com.refill.member.dto.response.MemberInfoResponse;
import com.refill.member.entity.Member;
import com.refill.member.service.MemberService;
import com.refill.reservation.dto.response.ReservationListResponse;
import com.refill.reservation.service.ReservationService;
import com.refill.security.util.LoginInfo;
import java.util.List;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/v1/member")
@RestController
public class MemberController {

    private final MemberService memberService;
    private final AiDiagnosisService aiDiagnosisService;
    private final ReservationService reservationService;
    private final ConsultingService consultingService;
    @GetMapping("/mypage")
    public ResponseEntity<MemberInfoResponse> getMemberInfo(@AuthenticationPrincipal LoginInfo loginInfo) {

        log.debug("'{}' member request mypage", loginInfo.loginId());
        Member member = memberService.findByLoginId(loginInfo.loginId());
        List<AiDiagnosisListResponse> aiDiagnosisList = aiDiagnosisService.findAllByMember(loginInfo.loginId());
        List<ReservationListResponse> reservationList = reservationService.findAllByMember(loginInfo.loginId());
        List<ConsultingListResponse> consultingList = consultingService.getConsultingList(loginInfo.loginId());

        return ResponseEntity.ok().body(new MemberInfoResponse(member, aiDiagnosisList, reservationList, consultingList));
    }

    @PutMapping("/mypage")
    public ResponseEntity<String> modifyMemberInfo(@AuthenticationPrincipal LoginInfo loginInfo, @RequestPart("memberInfoUpdateRequest") @Valid final MemberInfoUpdateRequest memberInfoUpdateRequest, @RequestPart(value = "profileImg", required = false) MultipartFile profileImg){

        log.debug("'{}' member request information update", loginInfo.loginId());
        memberService.modifyMember(loginInfo.loginId(), memberInfoUpdateRequest, profileImg);

        return ResponseEntity.noContent().build();
    }

    @PutMapping("/mypage/password")
    public ResponseEntity<String> modifyMemberPassword(@AuthenticationPrincipal LoginInfo loginInfo, @RequestBody MemberPasswordUpdateRequest memberPasswordUpdateRequest) {

        log.debug("'{}' member request password update", loginInfo.loginId());
        memberService.modifyPassword(loginInfo.loginId(), memberPasswordUpdateRequest);

        return ResponseEntity.noContent().build();
    }


}
