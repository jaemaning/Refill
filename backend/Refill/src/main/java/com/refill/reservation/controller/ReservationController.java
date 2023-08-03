package com.refill.reservation.controller;

import com.refill.reservation.dto.request.ReservationRequest;
import com.refill.reservation.dto.response.DisabledReservationTimeResponse;
import com.refill.reservation.dto.response.ReservationListResponse;
import com.refill.reservation.dto.response.ReservationResultResponse;
import com.refill.reservation.service.ReservationService;
import com.refill.security.util.LoginInfo;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

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

        return ResponseEntity.ok().body(disabledReservationTimeResponses);
    }

    @PostMapping("/")
    public ResponseEntity<ReservationResultResponse> makeReservation(@AuthenticationPrincipal LoginInfo loginInfo, @RequestPart("reservationRequest") final ReservationRequest reservationRequest, @RequestPart(value = "image", required = false) MultipartFile hairImage) {

        log.debug("'{}' member request reservation to '{}' doctor", loginInfo.loginId(), reservationRequest.doctorId());
        ReservationResultResponse reservationResultResponse = reservationService.makeReservation(loginInfo.loginId(), reservationRequest, hairImage);

        return ResponseEntity.ok().body(reservationResultResponse);
    }

    @DeleteMapping("/{reservationId}")
    public ResponseEntity<String> deleteReservation(@AuthenticationPrincipal LoginInfo loginInfo, @PathVariable Long reservationId){

        log.debug("'{}' member request delete '{}' Reservation", loginInfo.loginId(), reservationId);
        reservationService.deleteReservation(loginInfo.loginId(), reservationId);

        return ResponseEntity.noContent().build();
    }
}
