package com.refill.account.controller;

import com.refill.account.dto.request.HospitalJoinRequest;
import com.refill.account.dto.request.HospitalLoginRequest;
import com.refill.account.dto.request.LoginIdFindRequest;
import com.refill.account.dto.request.LoginPasswordRequest;
import com.refill.account.dto.request.MemberJoinRequest;
import com.refill.account.dto.request.MemberLoginRequest;
import com.refill.account.dto.request.RefreshRequest;
import com.refill.account.dto.response.RefreshResponse;
import com.refill.account.dto.response.TokenResponse;
import com.refill.account.service.AccountService;
import com.refill.security.util.LoginInfo;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
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

        return ResponseEntity.noContent().build();
    }

    @PostMapping("/hospital/join")
    public ResponseEntity<String> joinHospital(@RequestPart("hospitalJoinRequest") @Valid final HospitalJoinRequest hospitalJoinRequest, @RequestPart("profileImg") MultipartFile profileImg, @RequestPart("regImg") MultipartFile regImg) {

        log.debug("'{}' hospital request joinHospital", hospitalJoinRequest.loginId());
        accountService.hospitalJoin(hospitalJoinRequest, profileImg, regImg);

        return ResponseEntity.noContent().build();
    }

    @PostMapping("/member/login")
    public ResponseEntity<TokenResponse> loginMember(@RequestBody @Valid final MemberLoginRequest memberLoginRequest) {

        log.debug("'{}' member request login", memberLoginRequest.loginId());
        TokenResponse tokenResponse = accountService.memberLogin(memberLoginRequest);

        return ResponseEntity.ok().body(tokenResponse);
    }

    @PostMapping("/hospital/login")
    public ResponseEntity<TokenResponse> loginHospital(@RequestBody @Valid final HospitalLoginRequest hospitalLoginRequest) {

        log.debug("'{}' member request login", hospitalLoginRequest.loginId());
        TokenResponse tokenResponse = accountService.hospitalLogin(hospitalLoginRequest);

        return ResponseEntity.ok().body(tokenResponse);
    }

    @PostMapping("/member/find/id")
    public ResponseEntity<String> findMemberLoginId(@RequestBody @Valid final LoginIdFindRequest loginIdFindRequest) {

        log.debug("'{}' email request find loginId", loginIdFindRequest.email());
        String message = accountService.findMemberLoginId(loginIdFindRequest);

        return ResponseEntity.ok().body(message);
    }

    @PostMapping("/hospital/find/id")
    public ResponseEntity<String> findHospitalLoginId(@RequestBody @Valid final LoginIdFindRequest loginIdFindRequest) {

        log.debug("'{}' email request find loginId", loginIdFindRequest.email());
        String message = accountService.findHospitalLoginId(loginIdFindRequest);

        return ResponseEntity.ok().body(message);
    }

    @PostMapping("/member/find/password")
    public ResponseEntity<String> findMemberPassword(@RequestBody @Valid final LoginPasswordRequest loginPasswordRequest) {

        log.debug("'{}' member request reset password", loginPasswordRequest.loginId());
        String message = accountService.findMemberPassword(loginPasswordRequest);

        return ResponseEntity.ok().body(message);
    }

    @PostMapping("/hospital/find/password")
    public ResponseEntity<String> findHospitalPassword(@RequestBody @Valid final LoginPasswordRequest loginPasswordRequest) {

        log.debug("'{}' member request reset password", loginPasswordRequest.loginId());
        String message = accountService.findHospitalPassword(loginPasswordRequest);

        return ResponseEntity.ok().body(message);
    }

    @PostMapping("/refresh")
    public ResponseEntity<RefreshResponse> refreshToken(@RequestBody final RefreshRequest refreshRequest) {

        log.debug("member request refreshAccessToken");

        RefreshResponse refreshResponse = accountService.refreshAccessToken(refreshRequest);

        return ResponseEntity.ok().body(refreshResponse);
    }

    @GetMapping("/logout")
    public ResponseEntity<Void> logout(@AuthenticationPrincipal LoginInfo loginInfo) {

        log.debug("'{}' member request logout", loginInfo.loginId());

        accountService.logout(loginInfo);
        return ResponseEntity.noContent().build();
    }




}
