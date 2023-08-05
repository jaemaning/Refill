package com.refill.hospital.controller;

import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.preprocessRequest;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.preprocessResponse;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.prettyPrint;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.refill.util.ControllerTest;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
import org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders;

class HospitalControllerTest extends ControllerTest {

    @Test
    @DisplayName("테스트_예제")
    void sayHello() throws Exception {
        mockMvc.perform(get("/api/v1/hospital/"))
               .andExpect(status()
                                               .isOk())
               .andExpect(content()
                                               .string("hello"));
    }

    @Test
    @DisplayName("병원_검색_위도_경도_테스트")
    public void testSearchByLocation() throws Exception {
        this.mockMvc.perform(RestDocumentationRequestBuilders.get("/api/v1/hospital/search/location")
                                                             .param("latitude", "37.5665")
                                                             .param("longitude", "126.9780")
                                                             .accept(MediaType.APPLICATION_JSON))
                    .andExpect(status().isOk())
                    .andDo(document("searchByLocation",
                        preprocessRequest(prettyPrint()), preprocessResponse(prettyPrint())));
    }

    @Test
    @DisplayName("병원_검색_키워드_테스트")
    public void testSearchByKeyword() throws Exception {
        this.mockMvc.perform(RestDocumentationRequestBuilders.get("/api/v1/hospital/search/keyword")
                                                             .param("name", "Hospital Name")
                                                             .param("addr", "Hospital Address")
                                                             .accept(MediaType.APPLICATION_JSON))
                    .andExpect(status().isOk())
                    .andDo(document("searchByKeyword",
                        preprocessRequest(prettyPrint()), preprocessResponse(prettyPrint())));
    }

//    @Test
//    public void testGetHospitalDetail() throws Exception {
//        HospitalDetailResponse mockResponse = new HospitalDetailResponse();
//        mockResponse.setHospitalId(1L);
//        mockResponse.setName("Test Hospital");
//        mockResponse.setAddress("Test Address");
//
//        when(hospitalService.getHospitalDetail(1L)).thenReturn(mockResponse);
//
//        this.mockMvc.perform(get("/api/v1/hospital/{hospitalId}", 1L)
//                .accept(MediaType.APPLICATION_JSON))
//                    .andExpect(status().isOk())
//                    .andDo(document("getHospitalDetail",
//                        pathParameters(
//                            parameterWithName("hospitalId").description("병원 아이디")
//                        ),
//                        responseFields(
//                            fieldWithPath("hospitalId").description("병원 아이디"),
//                            fieldWithPath("name").description("병원 이름"),
//                            fieldWithPath("address").description("병원 주소")
//                        )));
//    }

//    @Test
//    @DisplayName("병원_정보_수정_테스트")
//    public void testModifyHospitalInfo() throws Exception {
//        String requestBody = "{\"name\":\"Updated Hospital\", \"address\":\"Updated Address\"}";
//
//        this.mockMvc.perform(put("/api/v1/hospital/{hospitalId}", 1L)
//                .contentType(MediaType.APPLICATION_JSON)
//                .content(requestBody))
//                    .andExpect(status().isOk())
//                    .andDo(document("modifyHospitalInfo",
//                        pathParameters(
//                            parameterWithName("hospitalId").description("병원 아이디")
//                        ),
//                        requestFields(
//                            fieldWithPath("name").description("병원 이름"),
//                            fieldWithPath("address").description("병원 주소")
//                        )));
//    }
}