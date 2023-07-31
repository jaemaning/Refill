package com.refill.member.controller;

import com.refill.member.dto.response.MemberInfoResponse;
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

    @GetMapping("/mypage")
    public ResponseEntity<MemberInfoResponse> getMemberInfo(@AuthenticationPrincipal String loginId) {

        log.debug("'{}' member request mypage", loginId);
        MemberInfoResponse memberInfoResponse = memberService.getMemberByLoginId(loginId);

        return ResponseEntity.ok().body(memberInfoResponse);
    }


}
