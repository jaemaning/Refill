package com.refill.aidiagnosis.controller;

import com.refill.aidiagnosis.dto.response.AiDiagnosisResponse;
import com.refill.aidiagnosis.service.AiDiagnosisService;
import com.refill.security.util.LoginInfo;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RequiredArgsConstructor
@RequestMapping("api/v1/diagnosis")
@RestController
public class AiDiagnosisController {

    private final AiDiagnosisService aiDiagnosisService;

    @GetMapping("/")
    public ResponseEntity<List<AiDiagnosisResponse>> getAiDiagnosisList(@AuthenticationPrincipal LoginInfo loginInfo) {
        //TODO : 어떤 항목 넘길지, AI 정확도에 대해서 고민하기
        log.debug("'{}' member request AiDiagnosisList", loginInfo.loginId());
        List<AiDiagnosisResponse> aiDiagnosisResponseList = aiDiagnosisService.findAllByMember(loginInfo.loginId());

        return ResponseEntity.ok().body(aiDiagnosisResponseList);
    }

    @GetMapping("/{id}")
    public ResponseEntity<AiDiagnosisResponse> getDetailAiDiagnosis(@AuthenticationPrincipal LoginInfo loginInfo, @PathVariable Long id) {

        log.debug("'{}' member request AiDiagnosisHistory", loginInfo.loginId());
        AiDiagnosisResponse aiDiagnosisResponse = aiDiagnosisService.findById(id, loginInfo.loginId());

        return ResponseEntity.ok().body(aiDiagnosisResponse);
    }


}
