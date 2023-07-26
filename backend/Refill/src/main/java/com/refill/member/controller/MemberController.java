package com.refill.member.controller;

import com.refill.global.entity.UserInfo;
import com.refill.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/v1/member")
@RestController
public class MemberController {

    private final MemberService memberService;

    @GetMapping("/join")
    public ResponseEntity<String> sayHello() {

        return ResponseEntity.ok().body("hello");
    }

    @GetMapping("/security")
    public void testMethod(@AuthenticationPrincipal UserInfo userInfo) {

        log.info("########### {} ##########", userInfo.getAuthorities());
    }

}
