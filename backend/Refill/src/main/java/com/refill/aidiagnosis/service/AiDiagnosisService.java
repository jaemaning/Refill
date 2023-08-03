package com.refill.aidiagnosis.service;

import com.refill.aidiagnosis.dto.request.AiDiagnosisRequest;
import com.refill.aidiagnosis.dto.response.AiDiagnosisListResponse;
import com.refill.aidiagnosis.dto.response.AiDiagnosisResponse;
import com.refill.aidiagnosis.dto.response.AiServerResponse;
import com.refill.aidiagnosis.entity.AiDiagnosis;
import com.refill.aidiagnosis.entity.HairLossType;
import com.refill.aidiagnosis.repository.AiDiagnosisRepository;
import com.refill.global.exception.ErrorCode;
import com.refill.global.service.AmazonS3Service;
import com.refill.member.entity.Member;
import com.refill.member.exception.MemberException;
import com.refill.member.service.MemberService;
import com.refill.security.util.LoginInfo;
import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;
import javax.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.client.MultipartBodyBuilder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.MultiValueMap;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Slf4j
@RequiredArgsConstructor
@Service
public class AiDiagnosisService {

    private final AiDiagnosisRepository aiDiagnosisRepository;
    private final MemberService memberService;
    private final AmazonS3Service amazonS3Service;
    private final String url = "localhost:5000/predict";

    public List<AiDiagnosisListResponse> findAllByMember(String loginId) {

        Member member = memberService.findByLoginId(loginId);

        return aiDiagnosisRepository.findAllByMember(member)
                                    .stream()
                                    .map(AiDiagnosisListResponse::from)
                                    .collect(Collectors.toList());
    }

    public AiDiagnosisResponse findById(Long id, String loginId) {

        AiDiagnosis aiDiagnosis = aiDiagnosisRepository.findById(id)
                                                       .orElseThrow(EntityNotFoundException::new);

        if (!aiDiagnosis.getMember()
                        .getLoginId()
                        .equals(loginId)) {
            throw new MemberException(ErrorCode.UNAUTHORIZED_REQUEST);
        }

        return new AiDiagnosisResponse(aiDiagnosis);
    }

    @Transactional
    public AiDiagnosisResponse doAiDiagnosis(LoginInfo loginInfo, AiDiagnosisRequest aiDiagnosisRequest, MultipartFile hairImg) {

        Member member = memberService.findByLoginId(loginInfo.loginId());
        AiServerResponse aiServerResponse = imageSendToAiServer(hairImg);

        HairLossType hairLossType = HairLossType.getType(aiServerResponse.result());
        Integer hairLossScore = HairLossType.scoreGenerator(hairLossType,
            aiDiagnosisRequest.surveyResult());

        AiDiagnosis aiDiagnosis = AiDiagnosis.builder()
                                             .member(member)
                                             .hairLossScore(hairLossScore)
                                             .hairLossType(hairLossType)
                                             .surveyResult(aiDiagnosisRequest.surveyResult())
                                             .build();

        String address = amazonS3Service.uploadFile(hairImg);
        aiDiagnosis.updateFileAddress(address);
        aiDiagnosisRepository.save(aiDiagnosis);

        return new AiDiagnosisResponse(aiDiagnosis);

    }

    private AiServerResponse imageSendToAiServer(MultipartFile hairImg) {

        WebClient webClient = WebClient.builder()
                                       .build();

        MultipartBodyBuilder builder = new MultipartBodyBuilder();
        builder.part("image", hairImg.getResource(), MediaType.IMAGE_JPEG);

        MultiValueMap<String, HttpEntity<?>> body = builder.build();

        URI uri = URI.create(url);

        AiServerResponse aiServerResponse = webClient.post()
                                                     .uri(uri)
                                                     .contentType(MediaType.MULTIPART_FORM_DATA)
                                                     .body(BodyInserters.fromMultipartData(body))
                                                     .retrieve()
                                                     .onStatus(HttpStatus::is4xxClientError,
                                                         response ->
                                                             Mono.error(
                                                                 new MemberException(
                                                                     ErrorCode.UNAUTHORIZED_REQUEST)
                                                             )
                                                     )
                                                     .onStatus(HttpStatus::is5xxServerError,
                                                         response ->
                                                             Mono.error(
                                                                 new MemberException(
                                                                     ErrorCode.UNAUTHORIZED_REQUEST)
                                                             ))
                                                     .bodyToMono(AiServerResponse.class)
                                                     .block();

        if (aiServerResponse == null) {
            throw new EntityNotFoundException();
        }

        return aiServerResponse;
    }


}
