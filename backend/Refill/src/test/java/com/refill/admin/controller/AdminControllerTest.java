package com.refill.admin.controller;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.get;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.preprocessResponse;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.prettyPrint;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.responseFields;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import static org.springframework.restdocs.request.RequestDocumentation.pathParameters;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.refill.admin.dto.response.WaitingHospitalResponse;
import com.refill.global.entity.Message;
import com.refill.util.ControllerTest;
import java.util.ArrayList;
import java.util.List;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;

class AdminControllerTest extends ControllerTest {

    private final String baseUrl = "/api/v1/admin";

    @Test
    @WithMockUser(username = "admin", roles = "ADMIN")
    @DisplayName("승인_대기중인_병원_목록_보여진다")
    void show_waiting_hospital_list() throws Exception{

        List<WaitingHospitalResponse> list = new ArrayList<>();

        //응답 데이터를 위해 넣어주어야 함
        WaitingHospitalResponse mockResponse = new WaitingHospitalResponse(1L, "loginId", "name", "address", "tel", "email", "profileImg", "registrationImg");
        list.add(mockResponse);

        when(adminService.findHospitalsByWaiting()).thenReturn(list);

        mockMvc.perform(
            get(baseUrl + "/hospitals")
                //.header("Authorization", "Bearer " + token)
                .contentType(MediaType.APPLICATION_JSON)
        ).andExpect(status().isOk())
            .andDo(
                document("admin/hospitals",
                    preprocessResponse(prettyPrint()),
                    responseFields(
                        fieldWithPath("[]").description("승인 대기중인 병원"),
                        fieldWithPath("[].id").description("병원 PK"),
                        fieldWithPath("[].loginId").description("병원 로그인 아이디"),
                        fieldWithPath("[].name").description("병원 이름"),
                        fieldWithPath("[].address").description("병원 주소"),
                        fieldWithPath("[].tel").description("병원 번호"),
                        fieldWithPath("[].email").description("병원 이메일"),
                        fieldWithPath("[].hospitalProfileImg").description("병원 프로필 사진"),
                        fieldWithPath("[].registrationImg").description("병원 등록증 사진")
                    ))
            );
    }

    @Test
    @WithMockUser(username = "admin", roles = "ADMIN")
    @DisplayName("병원_관리자에_의해_승인된다")
    void hospital_accepted_by_admin() throws Exception {

        Long hospitalId = 1L;

        when(adminService.acceptHospital(any(Long.class))).thenReturn("{\"message\":\"%s\"}".formatted(Message.ACCEPT_HOSPITAL.getMessage()));

        mockMvc.perform(
                   get(baseUrl + "/hospitals/accept/{id}", hospitalId)
                       .contentType(MediaType.APPLICATION_JSON)
               )
               .andExpect(status().isOk())
               .andDo(
                   document("admin/hospitals/accept",
                       preprocessResponse(prettyPrint()),
                       pathParameters(
                           parameterWithName("id").description("승인할 병원의 ID")
                       ),
                       responseFields(
                           fieldWithPath("message").description("결과 메세지")
                       ))
               );
    }
}