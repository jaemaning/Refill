package com.refill.account.controller;

import com.refill.account.dto.request.HospitalJoinRequest;
import com.refill.account.dto.request.MemberJoinRequest;
import com.refill.account.service.AccountService;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/v1/account")
@RestController
public class AccountController {

    private final AccountService accountService;

    @PostMapping("/member/join")
    public ResponseEntity<String> joinMember(@RequestPart("memberJoinRequest") @Valid final MemberJoinRequest memberJoinRequest, @RequestPart(value = "profileImg", required = false) MultipartFile profileImg) {

        log.debug("'{}' member request memberJoin", memberJoinRequest.loginId());
        accountService.memberJoin(memberJoinRequest, profileImg);

        return ResponseEntity.ok()
                             .body("SUCCESS");
    }

    @PostMapping("/hospital/join")
    public ResponseEntity<String> joinHospital(@RequestPart @Valid final HospitalJoinRequest hospitalJoinRequest, @RequestPart("profileImg") MultipartFile profileImg, @RequestPart("regImg") MultipartFile regImg) {

        log.debug("'{}' hospital request joinHospital", hospitalJoinRequest.loginId());

        return ResponseEntity.ok()
                             .body("SUCCESS");
    }


}
