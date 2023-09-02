package com.refill.account.controller;

import com.refill.account.dto.request.EmailVerifyRequest;
import com.refill.account.dto.request.HospitalJoinRequest;
import com.refill.account.dto.request.LoginIdFindRequest;
import com.refill.account.dto.request.LoginPasswordRequest;
import com.refill.account.dto.request.LoginRequest;
import com.refill.account.dto.request.MemberJoinRequest;
import com.refill.account.dto.request.RefreshRequest;
import com.refill.account.dto.response.EmailVerifyResponse;
import com.refill.account.dto.response.RefreshResponse;
import com.refill.account.dto.response.TokenResponse;
import com.refill.account.entity.ClientType;
import com.refill.account.service.AccountService;
import com.refill.security.util.LoginInfo;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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

    @PostMapping("/{clientType}/login")
    public ResponseEntity<TokenResponse> login(@PathVariable("clientType") ClientType clientType, @RequestBody @Valid final LoginRequest loginRequest) {

        log.debug("'{}' member request login", loginRequest.loginId());
        TokenResponse tokenResponse = accountService.login(clientType, loginRequest);
        return ResponseEntity.ok().body(tokenResponse);
    }

    @PostMapping("/{clientType}/find/id")
    public ResponseEntity<String> findLoginId(@PathVariable ClientType clientType, @RequestBody @Valid final LoginIdFindRequest loginIdFindRequest) {

        log.debug("'{}' email request find loginId", loginIdFindRequest.email());
        String message = accountService.findLoginId(clientType, loginIdFindRequest);

        return ResponseEntity.ok().body(message);
    }

    @PostMapping("/{clientType}/find/password")
    public ResponseEntity<String> findPassword(@PathVariable ClientType clientType, @RequestBody @Valid final LoginPasswordRequest loginPasswordRequest) {

        log.debug("'{}' member request reset password", loginPasswordRequest.loginId());
        String message = accountService.findPassword(clientType, loginPasswordRequest);

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

    @PostMapping("/verify/join")
    public ResponseEntity<EmailVerifyResponse> verifyEmail(@RequestBody final EmailVerifyRequest emailVerifyRequest) {

        log.debug("'{}' member request verifyEmail", emailVerifyRequest.email());
        EmailVerifyResponse emailVerifyResponse = accountService.verifyEmail(emailVerifyRequest);

        return ResponseEntity.ok().body(emailVerifyResponse);
    }

    @DeleteMapping("/member/{id}")
    public ResponseEntity<String> deleteAccount(@PathVariable Long id, @AuthenticationPrincipal LoginInfo loginInfo){
        String message = accountService.deleteAccount(id, loginInfo);
        return ResponseEntity.ok().body(message);
    }

    @GetMapping
    public ResponseEntity<Void> justTesting(@AuthenticationPrincipal LoginInfo user) {
        return ResponseEntity.noContent().build();
    }




}
