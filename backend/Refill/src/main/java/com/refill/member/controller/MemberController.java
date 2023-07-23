package com.refill.member.controller;

import com.refill.member.dto.request.MemberLoginRequestDto;
import com.refill.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/v1/member")
@RestController
public class MemberController {

    private final MemberService memberService;

    @GetMapping("/test")
    public ResponseEntity<String> sayHello() {
        memberService.testCreate();
        return ResponseEntity.ok().body("hello");
    }

    @GetMapping("/login")
    public ResponseEntity<String> login(@RequestBody MemberLoginRequestDto memberLoginRequestDto) {

        String token = memberService.login(memberLoginRequestDto);


        return ResponseEntity.ok().body(token);
    }

}
