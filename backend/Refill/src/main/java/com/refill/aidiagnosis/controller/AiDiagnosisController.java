package com.refill.aidiagnosis.controller;

import com.refill.aidiagnosis.dto.request.AiDiagnosisRequest;
import com.refill.aidiagnosis.dto.response.AiDiagnosisResponse;
import com.refill.aidiagnosis.service.AiDiagnosisService;
import com.refill.security.util.LoginInfo;
import java.util.List;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

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

    /*
    TODO
     1. front에서 survey 결과, 머리 사진으로 post 요청 받기(RequestPart)
     2. 파라미터들 가지고 그대로 service로 이동
     3. 서비스에서, flask로 사진 전송해서 결과 return받기
     4. return된 결과로, entity 생성하기
     5. 서베이, 결과를 합쳐서 탈모 진행도 계산하기
     6. 결과값을 front로 dto로 보내주기
     7.
     */

    @PostMapping("/")
    public ResponseEntity<String> doAiDiagnosis(@AuthenticationPrincipal LoginInfo loginInfo, @RequestPart @Valid final AiDiagnosisRequest aiDiagnosisRequest, @RequestPart MultipartFile hairImg) {

        String res = aiDiagnosisService.doAiDiagnosis(loginInfo, aiDiagnosisRequest, hairImg);
        log.info("################## {} ###############", aiDiagnosisRequest.surveyResult());

        return ResponseEntity.ok().body(res);
    }


}
