package com.refill.hospital.controller;

import com.refill.security.util.LoginInfo;
import com.refill.hospital.service.HospitalService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RequestMapping("/api/v1/hospital")
@RestController
public class HospitalController {

    private final HospitalService hospitalService;

    @GetMapping("/")
    public ResponseEntity<String> sayHello(@AuthenticationPrincipal LoginInfo loginInfo) {

        return ResponseEntity.ok().body(loginInfo.toString());
    }
}
