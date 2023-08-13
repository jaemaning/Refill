package com.refill.aidiagnosis.controller;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.get;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.multipart;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.preprocessRequest;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.preprocessResponse;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.prettyPrint;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.requestPartFields;
import static org.springframework.restdocs.payload.PayloadDocumentation.responseFields;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import static org.springframework.restdocs.request.RequestDocumentation.partWithName;
import static org.springframework.restdocs.request.RequestDocumentation.pathParameters;
import static org.springframework.restdocs.request.RequestDocumentation.requestParts;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.authentication;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.refill.aidiagnosis.dto.request.AiDiagnosisRequest;
import com.refill.aidiagnosis.dto.response.AiDiagnosisListResponse;
import com.refill.aidiagnosis.dto.response.AiDiagnosisResponse;
import com.refill.global.entity.Role;
import com.refill.security.util.LoginInfo;
import com.refill.util.ControllerTest;
import java.nio.charset.StandardCharsets;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.security.authentication.TestingAuthenticationToken;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;

class AiDiagnosisControllerTest extends ControllerTest {

    private final String baseUrl = "/api/v1/diagnosis";

    @DisplayName("AI진단_리스트_조회된다")
    @Test
    void ai_diagnosis_list_checked_by_member() throws Exception {

        List<AiDiagnosisListResponse> mockList = new ArrayList<>();
        AiDiagnosisListResponse mockResponse = new AiDiagnosisListResponse(1L, LocalDate.now(), 100, "12.123","imageS3Address");

        mockList.add(mockResponse);

        when(aiDiagnosisService.findAllByMember(any())).thenReturn(mockList);

        LoginInfo loginInfo = new LoginInfo("member", Role.ROLE_MEMBER);
        SecurityContext securityContext = SecurityContextHolder.createEmptyContext();
        securityContext.setAuthentication(new TestingAuthenticationToken(loginInfo, null));
        SecurityContextHolder.setContext(securityContext);

        mockMvc.perform(
            get(baseUrl + "/")
                .with(authentication(new TestingAuthenticationToken(loginInfo, null)))
                .contentType(MediaType.APPLICATION_JSON)
        ).andExpect(status().isOk())
            .andDo(
                document("diagnosis/findAll",
                    preprocessResponse(prettyPrint()),
                responseFields(
                    fieldWithPath("[]").description("AI 진단 목록"),
                    fieldWithPath("[].id").description("AI 진단 PK 값"),
                    fieldWithPath("[].diagnosisDate").description("AI 진단 날짜"),
                    fieldWithPath("[].hairLossScore").description("AI 진단 점수"),
                    fieldWithPath("[].diagnosisImage").description("AI 진단 시 사용한 사진 주소")
                ))
            );
    }

    @DisplayName("AI진단_상세_조회된다")
    @Test
    void ai_diagnosis_detail_checked_by_member() throws Exception {

        AiDiagnosisResponse aiDiagnosisResponse = new AiDiagnosisResponse(100, "99.99","hairImageS3Address", LocalDate.now() );

        when(aiDiagnosisService.findById(any(), any())).thenReturn(aiDiagnosisResponse);

        LoginInfo loginInfo = new LoginInfo("member", Role.ROLE_MEMBER);
        SecurityContext securityContext = SecurityContextHolder.createEmptyContext();
        securityContext.setAuthentication(new TestingAuthenticationToken(loginInfo, null));
        SecurityContextHolder.setContext(securityContext);

        mockMvc.perform(
                   get(baseUrl + "/{diagnosisId}", 1L)
                       .with(authentication(new TestingAuthenticationToken(loginInfo, null)))
                       .contentType(MediaType.APPLICATION_JSON)
               ).andExpect(status().isOk())
               .andDo(
                   document("diagnosis/findById",
                       preprocessResponse(prettyPrint()),
                       pathParameters(
                           parameterWithName("diagnosisId").description("AI 진단 PK값")
                       ),
                       responseFields(
                           fieldWithPath("diagnosisDate").description("AI 진단 날짜"),
                           fieldWithPath("certainty").description("확신도"),
                           fieldWithPath("hairLossScore").description("AI 진단 점수"),
                           fieldWithPath("diagnosisImage").description("AI 진단 시 사용한 사진 주소")
                       ))
               );
    }

    @DisplayName("AI진단_상세_수행된다")
    @Test
    void ai_diagnosis_do_checked_by_member() throws Exception {

        AiDiagnosisRequest aiDiagnosisRequest = new AiDiagnosisRequest("1011110111");
        MockMultipartFile requestPart = new MockMultipartFile("aiDiagnosisRequest", "", "application/json", objectMapper.writeValueAsBytes(aiDiagnosisRequest));

        MockMultipartFile hairImg =
            new MockMultipartFile("hairImg", "reg.png", "image/png", "<<png data>>".getBytes(
                StandardCharsets.UTF_8));

        AiDiagnosisResponse aiDiagnosisResponse = new AiDiagnosisResponse(100, "99.99","hairImageS3Address", LocalDate.now());

        when(aiDiagnosisService.doAiDiagnosis(any(), any(), any())).thenReturn(aiDiagnosisResponse);

        LoginInfo loginInfo = new LoginInfo("member", Role.ROLE_MEMBER);
        SecurityContext securityContext = SecurityContextHolder.createEmptyContext();
        securityContext.setAuthentication(new TestingAuthenticationToken(loginInfo, null));
        SecurityContextHolder.setContext(securityContext);

        mockMvc.perform(
                   multipart(baseUrl + "/")
                       .file(requestPart)
                       .file(hairImg)
               ).andExpect(status().isOk())
               .andDo(
                   document("diagnosis/do",
                       preprocessRequest(prettyPrint()),
                       requestParts(
                           partWithName("aiDiagnosisRequest").description("AI 사전 설문 결과"),
                           partWithName("hairImg").description("머리 사진")
                       ),
                       requestPartFields("aiDiagnosisRequest",
                           fieldWithPath("surveyResult").type(JsonFieldType.STRING).description("AI 사전 설문 결과 값 EX) 1011011000")
                       )
                   )
               )
               .andDo(
                   document("diagnosis/do",
                       preprocessResponse(prettyPrint()),
                       responseFields(
                           fieldWithPath("diagnosisDate").description("AI 진단 날짜"),
                           fieldWithPath("hairLossScore").description("AI 진단 점수"),
                           fieldWithPath("certainty").description("AI 정확도"),
                           fieldWithPath("diagnosisImage").description("AI 진단 시 사용한 사진 주소")
                       )
                   )
               );
    }
}