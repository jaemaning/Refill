package com.refill.reservation.controller;

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

import com.refill.global.entity.Role;
import com.refill.reservation.dto.request.ReservationRequest;
import com.refill.reservation.dto.response.DisabledReservationTimeResponse;
import com.refill.reservation.dto.response.ReservationListResponse;
import com.refill.reservation.dto.response.ReservationResultResponse;
import com.refill.security.util.LoginInfo;
import com.refill.util.ControllerTest;
import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
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

class ReservationControllerTest extends ControllerTest {

    private final String baseUrl = "/api/v1/reservation";

    @DisplayName("유저_예약목록_조회된다")
    @Test
    void reservation_list_checked_by_member() throws Exception {

        List<ReservationListResponse> list = new ArrayList<>();
        ReservationListResponse mockResponse = new ReservationListResponse(1L, "hospital", "doctor",
            LocalDateTime.now());

        list.add(mockResponse);

        LoginInfo loginInfo = new LoginInfo("member", Role.ROLE_MEMBER);
        SecurityContext securityContext = SecurityContextHolder.createEmptyContext();
        securityContext.setAuthentication(new TestingAuthenticationToken(loginInfo, null));
        SecurityContextHolder.setContext(securityContext);

        when(reservationService.findAllByMember(any())).thenReturn(list);


        mockMvc.perform(
                   get(baseUrl + "/")
                       .with(authentication(new TestingAuthenticationToken(loginInfo, null)))
                       .contentType(MediaType.APPLICATION_JSON)
               )
               .andExpect(status().isOk())
               .andDo(
                   document("reservation/findAll",
                       preprocessResponse(prettyPrint()),
                       responseFields(
                           fieldWithPath("[]").description("예약 목록"),
                           fieldWithPath("[].reservationId").type(JsonFieldType.NUMBER).description("reservation PK값"),
                           fieldWithPath("[].hospitalName").type(JsonFieldType.STRING).description("병원 이름"),
                           fieldWithPath("[].doctorName").type(JsonFieldType.STRING).description("의사 이름"),
                           fieldWithPath("[].startDateTime").type(JsonFieldType.STRING).description("시작 일시")
                       ))
               );

    }

    @DisplayName("의사_예약_불가능한_시간_조회된다")
    @Test
    void disabled_reservation_time_reserved() throws Exception {

        List<DisabledReservationTimeResponse> list = new ArrayList<>();
        DisabledReservationTimeResponse mockResponse = new DisabledReservationTimeResponse(LocalDateTime.now());

        list.add(mockResponse);

        LoginInfo loginInfo = new LoginInfo("member", Role.ROLE_MEMBER);
        SecurityContext securityContext = SecurityContextHolder.createEmptyContext();
        securityContext.setAuthentication(new TestingAuthenticationToken(loginInfo, null));
        SecurityContextHolder.setContext(securityContext);

        when(reservationService.findDisabledTimeByDoctor(any())).thenReturn(list);

        mockMvc.perform(
                   get(baseUrl + "/doctor/{doctorId}/disabled", 1L)
                       .with(authentication(new TestingAuthenticationToken(loginInfo, null)))
                       .contentType(MediaType.APPLICATION_JSON)
               )
               .andExpect(status().isOk())
               .andDo(
                   document("reservation/findAll",
                       preprocessRequest(prettyPrint()),
                       preprocessResponse(prettyPrint()),
                       pathParameters(
                           parameterWithName("doctorId").description("의사의 식별자")
                       ),
                       responseFields(
                           fieldWithPath("[]").description("의사 별 불가능한 날짜와 시간"),
                           fieldWithPath("[].startDateTime").type(JsonFieldType.STRING).description("이미 예약된 날짜, 시간")
                       ))
               );

    }

    @DisplayName("예약_생성된다")
    @Test
    void make_reservation() throws Exception {

        ReservationRequest reservationRequest = new ReservationRequest(1L, LocalDateTime.now(), "고민입니다.");
        MockMultipartFile requestPart = new MockMultipartFile("reservationRequest", "", "application/json", objectMapper.writeValueAsBytes(reservationRequest));

        ReservationResultResponse mockResponse = new ReservationResultResponse("회원 이름", LocalDateTime.now(), "병원 이름", "담당 의사 이름");


        MockMultipartFile hairImg =
            new MockMultipartFile("hairImg", "reg.png", "image/png", "<<png data>>".getBytes(
                StandardCharsets.UTF_8));

        LoginInfo loginInfo = new LoginInfo("member", Role.ROLE_MEMBER);
        SecurityContext securityContext = SecurityContextHolder.createEmptyContext();
        securityContext.setAuthentication(new TestingAuthenticationToken(loginInfo, null));
        SecurityContextHolder.setContext(securityContext);

        when(reservationService.makeReservation(any(), any(), any())).thenReturn(mockResponse);

        mockMvc.perform(
                   multipart(baseUrl + "/")
                       .file(requestPart)
                       .file(hairImg)
               )
               .andExpect(status().isOk())
               .andDo(
                   document("reservation/create",
                       preprocessRequest(prettyPrint()),
                       requestParts(
                           partWithName("reservationRequest").description("예약 요청 폼"),
                           partWithName("hairImg").description("머리 사진").optional()
                       ),
                       requestPartFields("reservationRequest",
                           fieldWithPath("doctorId").type(JsonFieldType.NUMBER).description("의사 PK값"),
                           fieldWithPath("startDateTime").type(JsonFieldType.STRING).description("상담 시작 일시"),
                           fieldWithPath("counselingDemands").type(JsonFieldType.STRING).description("상담 시 요청사항")
                       )
                   )
               )
               .andDo(
                   document("reservation/create",
                       preprocessResponse(prettyPrint()),
                       responseFields(
                           fieldWithPath("memberName").type(JsonFieldType.STRING).description("회원 이름"),
                           fieldWithPath("startDateTime").type(JsonFieldType.STRING).description("예약 일시"),
                           fieldWithPath("hospitalName").type(JsonFieldType.STRING).description("병원 이름"),
                           fieldWithPath("doctorName").type(JsonFieldType.STRING).description("의사 이름")
                       )
                   )
               );

    }



}