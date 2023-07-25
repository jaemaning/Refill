package com.refill.account.controller;

import com.refill.account.dto.request.MemberJoinRequest;
import com.refill.account.service.AccountService;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/v1/account")
@RestController
public class AccountController {

    private final AccountService accountService;

    @PostMapping("/member/join")
    public ResponseEntity<String> joinMember(@RequestBody @Valid final MemberJoinRequest memberJoinRequest) {

        log.debug("'{}' member request memberJoin", memberJoinRequest.loginId());
        accountService.memberJoin(memberJoinRequest);

        return ResponseEntity.ok().body("SUCCESS");
    }


}
