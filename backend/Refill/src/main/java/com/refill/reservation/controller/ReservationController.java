package com.refill.reservation.controller;

import com.refill.reservation.dto.request.ReservationRequest;
import com.refill.reservation.dto.response.DisabledReservationTimeResponse;
import com.refill.reservation.dto.response.ReservationListResponse;
import com.refill.reservation.service.ReservationService;
import com.refill.security.util.LoginInfo;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/v1/reservation")
@RestController
public class ReservationController {

    private final ReservationService reservationService;

    @GetMapping("/")
    public ResponseEntity<List<ReservationListResponse>> getReservationList(@AuthenticationPrincipal LoginInfo loginInfo) {

        log.debug("'{}' member request reservationList", loginInfo.loginId());
        List<ReservationListResponse> reservationList = reservationService.findAllByMember(loginInfo.loginId());


        return ResponseEntity.ok().body(reservationList);
    }

    @GetMapping("/doctor/{doctorId}/disabled")
    public ResponseEntity<List<DisabledReservationTimeResponse>> getDisabledReservationTimeByDoctor(@AuthenticationPrincipal LoginInfo loginInfo, @PathVariable Long doctorId) {

        log.debug("disabled time reserved");
        List<DisabledReservationTimeResponse> disabledReservationTimeResponses = reservationService.findDisabledTimeByDoctor(doctorId);

        return ResponseEntity.ok().build();
    }

    /*
    TODO
    예약할 때 필요한거

    1. 날짜 / 시간
    2. 의사
    3. 유저
    4. 상담 시 요구사항

    리턴 값

    1. 유저이름
    2. 신청일시
    3. 상담 병원
    4. 담당 의사
     */

    @PostMapping("/")
    public ResponseEntity<String> makeReservation(@AuthenticationPrincipal LoginInfo loginInfo, @RequestBody final ReservationRequest reservationRequest) {

        log.debug("'{}' member request reservation to '{}' doctor", loginInfo.loginId(), reservationRequest.doctorId());


        return ResponseEntity.ok().build();
    }
}
