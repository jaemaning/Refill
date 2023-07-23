package com.refill.hospital.controller;

import com.refill.hospital.service.HospitalService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RequestMapping("/api/v1/hospital")
@RestController
public class HospitalController {

    private final HospitalService hospitalService;

    @GetMapping("/")
    public ResponseEntity<String> sayHello() {

        hospitalService.testCreate();
        return ResponseEntity.ok().body("hello");
    }
}
