package com.refill.account.controller;

import com.refill.account.dto.request.MemberJoinRequest;
import com.refill.account.service.AccountService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/v1/account")
@RestController
public class AccountController {

    private final AccountService accountService;

    @GetMapping("/member/join")
    public ResponseEntity<String> joinMember(@RequestBody MemberJoinRequest memberJoinRequest) {

        return ResponseEntity.ok("hello");
    }
}
