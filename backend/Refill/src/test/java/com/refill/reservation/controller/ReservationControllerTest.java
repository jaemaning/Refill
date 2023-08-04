package com.refill.reservation.controller;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.get;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.preprocessResponse;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.prettyPrint;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.responseFields;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.authentication;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.refill.global.entity.Role;
import com.refill.reservation.dto.response.ReservationListResponse;
import com.refill.security.util.LoginInfo;
import com.refill.util.ControllerTest;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
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

}