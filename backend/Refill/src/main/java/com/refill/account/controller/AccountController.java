package com.refill.account.controller;

import com.refill.account.dto.request.HospitalJoinRequest;
import com.refill.account.dto.request.HospitalLoginRequest;
import com.refill.account.dto.request.LoginIdFindRequest;
import com.refill.account.dto.request.MemberJoinRequest;
import com.refill.account.dto.request.MemberLoginRequest;
import com.refill.account.service.AccountService;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
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
    public ResponseEntity<String> joinHospital(@RequestPart("hospitalJoinRequest") @Valid final HospitalJoinRequest hospitalJoinRequest, @RequestPart("profileImg") MultipartFile profileImg, @RequestPart("regImg") MultipartFile regImg) {

        log.debug("'{}' hospital request joinHospital", hospitalJoinRequest.loginId());
        accountService.hospitalJoin(hospitalJoinRequest, profileImg, regImg);
        return ResponseEntity.ok()
                             .body("SUCCESS");
    }

    @GetMapping("/member/login")
    public ResponseEntity<String> loginMember(@RequestBody @Valid final MemberLoginRequest memberLoginRequest) {

        log.debug("'{}' member request login", memberLoginRequest.loginId());
        String token = accountService.memberLogin(memberLoginRequest);

        return ResponseEntity.ok().body(token);
    }

    @GetMapping("/hospital/login")
    public ResponseEntity<String> loginHospital(@RequestBody @Valid final HospitalLoginRequest hospitalLoginRequest) {

        log.debug("'{}' member request login", hospitalLoginRequest.loginId());

        String token = accountService.hospitalLogin(hospitalLoginRequest);

        return ResponseEntity.ok().body(token);
    }

    @PostMapping("/find/id")
    public ResponseEntity<String> findLoginId(@RequestBody @Valid final LoginIdFindRequest loginIdFindRequest) {

        log.debug("'{}' email request find loginId", loginIdFindRequest.email());

        String message = accountService.findLoginId(loginIdFindRequest);

        return ResponseEntity.ok().body(message);
    }


}
