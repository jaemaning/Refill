package com.refill.aidiagnosis.controller;

import com.refill.aidiagnosis.service.AiDiagnosisService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RequiredArgsConstructor
@RequestMapping("api/v1/diagnosis")
@RestController
public class AiDiagnosisController {

    private final AiDiagnosisService aiDiagnosisService;
}
