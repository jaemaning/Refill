package com.refill.hospital.controller;

import static org.mockito.Mockito.when;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.get;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.put;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.preprocessRequest;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.preprocessResponse;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.prettyPrint;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.requestFields;
import static org.springframework.restdocs.payload.PayloadDocumentation.responseFields;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import static org.springframework.restdocs.request.RequestDocumentation.pathParameters;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.refill.doctor.entity.Doctor;
import com.refill.doctor.entity.EducationBackground;
import com.refill.doctor.entity.MajorArea;
import com.refill.global.entity.Role;
import com.refill.hospital.dto.response.HospitalDetailResponse;
import com.refill.hospital.entity.Hospital;
import com.refill.member.entity.Member;
import com.refill.review.entity.Review;
import com.refill.util.ControllerTest;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;

class HospitalControllerTest extends ControllerTest {

    private Hospital mockHospital;
    private Review mockReview;
    private Doctor mockDoctor;
    private Member mockMember;

    @BeforeEach
    void setUp() {
        createMember();
        createDoctor();
        createHospital();
        createReview();
    }

    void createHospital() {
        Hospital hospital = Hospital.builder()
                                    .name("호인병원")
                                    .address("경기도 수원시")
                                    .role(Role.ROLE_HOSPITAL)
                                    .postalCode("12345")
                                    .tel("010-1234-1234")
                                    .registrationImg("reg_img")
                                    .id(1L)
                                    .hospitalProfileImg("pro_img")
                                    .longitude(BigDecimal.valueOf(38.123))
                                    .latitude(BigDecimal.valueOf(128.123))
                                    .loginId("hospital1")
                                    .email("hos_@naver.com")
                                    .build();
        hospital.addDoctor(mockDoctor);
        mockHospital = hospital;
    }

    void createDoctor() {
        Doctor doctor = Doctor.builder()
                              .licenseNumber("123-123")
                              .profileImg("doc_pro_img")
                              .name("doctor1")
                              .description("모발이식1")
                              .build();
        MajorArea majorArea = MajorArea.builder()
                                       .content("주전공은..")
                                       .build();
        EducationBackground educationBackground = EducationBackground.builder()
                                                                     .content("서울대 졸업")
                                                                     .build();
        educationBackground.setDoctor(doctor);
        majorArea.setDoctor(doctor);

        doctor.addEducationBackground(educationBackground);
        doctor.addMajorArea(majorArea);
        mockDoctor = doctor;
    }

    void createMember() {
        Member member = Member.builder()
                              .name("사용자1")
                              .id(1L)
                              .address("장덕동")
                              .nickname("호인")
                              .build();
        mockMember = member;
    }

    void createReview() {
        Review review = Review.builder()
                              .content("정말 좋았어요.")
                              .member(mockMember)
                              .doctor(mockDoctor)
                              .hospital(mockHospital)
                              .score(3)
                              .updatedAt(LocalDateTime.now())
                              .build();
        mockDoctor.addReview(review);
        mockHospital.addReview(review);
        mockReview = review;
    }


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
        this.mockMvc.perform(
                get("/api/v1/hospital/search/location")
                    .param("latitude", "37.5665")
                    .param("longitude", "126.9780")
                    .accept(MediaType.APPLICATION_JSON))
                    .andExpect(status().isOk())
                    .andDo(document("hospital/searchByLocation",
                        preprocessRequest(prettyPrint()), preprocessResponse(prettyPrint())));
    }

    @Test
    @DisplayName("병원_검색_키워드_테스트")
    public void testSearchByKeyword() throws Exception {
        this.mockMvc.perform(get("/api/v1/hospital/search/keyword")
                .param("name", "Hospital Name")
                .param("addr", "Hospital Address")
                .accept(MediaType.APPLICATION_JSON))
                    .andExpect(status().isOk())
                    .andDo(document("searchByKeyword",
                        preprocessRequest(prettyPrint()), preprocessResponse(prettyPrint())));
    }

    @Test
    @DisplayName("병원_상세_조회_테스트")
    public void testGetHospitalDetail() throws Exception {

        HospitalDetailResponse mockResponse = new HospitalDetailResponse(mockHospital);
        when(hospitalService.getHospitalDetail(1L)).thenReturn(mockResponse);

        this.mockMvc.perform(get("/api/v1/hospital/{hospitalId}", 1L)
                .accept(MediaType.APPLICATION_JSON))
                    .andExpect(status().isOk())
                    .andDo(document("getHospitalDetail",
                        pathParameters(
                            parameterWithName("hospitalId").description("병원 아이디")
                        ),
                        responseFields(
                            fieldWithPath("hospitalResponse.address").description("병원 주소"),
                            fieldWithPath("hospitalResponse.hospitalId").description("병원 아이디"),
                            fieldWithPath("hospitalResponse.name").description("병원 이름"),
                            fieldWithPath("hospitalResponse.longitude").description("병원 위도"),
                            fieldWithPath("hospitalResponse.latitude").description("병원 경도"),
                            fieldWithPath("hospitalResponse.hospitalProfileImg").description(
                                "병원 프로필 이미지"),
                            fieldWithPath("hospitalResponse.bannerProfileImg").description(
                                "병원 배너 이미지"),
                            fieldWithPath("hospitalResponse.address").description("병원 주소"),
                            fieldWithPath("hospitalResponse.tel").description("병원 전화번호"),
                            fieldWithPath("hospitalResponse.score").description("병원 리뷰 평균 점수"),
                            fieldWithPath("hospitalResponse.email").description("병원 이메일"),

                            fieldWithPath("doctorResponses[].doctorId").description("의사 아이디"),
                            fieldWithPath("doctorResponses[].name").description("의사 이름"),
                            fieldWithPath("doctorResponses[].profileImg").description("의사 프로필 이미지"),
                            fieldWithPath("doctorResponses[].licenseNumber").description(
                                "의사 면허 번호"),
                            fieldWithPath("doctorResponses[].licenseImg").description("의사 면허 이미지"),
                            fieldWithPath("doctorResponses[].description").description("의사 약력"),
                            fieldWithPath("doctorResponses[].majorAreas.[]").description(
                                "주요 진료 분야"),
                            fieldWithPath("doctorResponses[].majorAreas.[]").description(
                                "주요 진료 분야"),
                            fieldWithPath("doctorResponses[].educationBackgrounds.[]").description(
                                "학력"),
                            fieldWithPath("doctorResponses[].educationBackgrounds.[]").description(
                                "학력")

//                            fieldWithPath("reviewResponses.[]").description("리뷰")
                        )));
    }

    @Test
    @DisplayName("병원_정보_수정_테스트")
    public void testModifyHospitalInfo() throws Exception {
        String requestBody = "{\"name\":\"Updated Hospital\", \"address\":\"Updated Address\"}";

        this.mockMvc.perform(put("/api/v1/hospital/{hospitalId}", 1L)
                .contentType(MediaType.APPLICATION_JSON)
                .content(requestBody))
                    .andExpect(status().isOk())
                    .andDo(document("modifyHospitalInfo",
                        pathParameters(
                            parameterWithName("hospitalId").description("병원 아이디")
                        ),
                        requestFields(

                        )));
    }
}