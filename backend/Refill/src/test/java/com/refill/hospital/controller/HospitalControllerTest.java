package com.refill.hospital.controller;

import static org.mockito.Mockito.when;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.put;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.preprocessRequest;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.preprocessResponse;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.prettyPrint;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.requestFields;
import static org.springframework.restdocs.payload.PayloadDocumentation.responseFields;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import static org.springframework.restdocs.request.RequestDocumentation.pathParameters;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
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
import java.util.ArrayList;
import java.util.List;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
import org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders;

class HospitalControllerTest extends ControllerTest {

    private Hospital mockHospital;

    @BeforeEach
    void setUp() {
        Member member = Member.builder()
                              .id(1L)
                              .name("호인")
                              .build();

        MajorArea majorArea = MajorArea.builder()
                                       .content("모발이식")
                                       .build();
        MajorArea majorArea1 = MajorArea.builder()
                                        .content("모발이식")
                                        .build();
        List<MajorArea> majorAreas = new ArrayList<>();
        majorAreas.add(majorArea);
        majorAreas.add(majorArea1);

        EducationBackground educationBackground = EducationBackground.builder()
                                                                     .content("서울대 졸업")
                                                                     .build();
        EducationBackground educationBackground1 = EducationBackground.builder()
                                                                      .content("고려대 졸업")
                                                                      .build();
        List<EducationBackground> educationBackgrounds = new ArrayList<>();
        educationBackgrounds.add(educationBackground1);
        educationBackgrounds.add(educationBackground);

        Doctor doctor = Doctor.builder()
                              .description("상담을 잘합니다.")
                              .majorAreas(majorAreas)
                              .educationBackgrounds(educationBackgrounds)
                              .build();
        Doctor doctor1 = Doctor.builder()
                               .description("모발이식을 잘합니다.")
                               .majorAreas(majorAreas)
                               .educationBackgrounds(educationBackgrounds)
                               .build();
        List<Doctor> doctorList = new ArrayList<>();
        doctorList.add(doctor1);
        doctorList.add(doctor);

        Review review1 = Review.builder()
                               .score(3)
                               .isBlocked(false)
            .member(member)
            .doctor(doctor)
            .hospital(mockHospital)
                               .build();
        Review review2 = Review.builder()
                               .score(2)
                               .isBlocked(false)
            .doctor(doctor1)
            .hospital(mockHospital)
            .member(member)
                               .build();
        List<Review> reviews = new ArrayList<>();
        reviews.add(review1);
        reviews.add(review2);

        Hospital hospital = Hospital.builder()
                                    .id(1L)
                                    .hospitalProfileImg("qwer")
                                    .hospitalBannerImg("qwer")
                                    .registrationImg("qewr")
                                    .tel("0101")
                                    .postalCode("1234")
                                    .role(Role.ROLE_HOSPITAL)
                                    .name("호인병원")
                                    .address("경기도 수원시 ")
                                    .doctors(doctorList)
                                    .reviews(reviews)
                                    .build();
        mockHospital = hospital;
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
                RestDocumentationRequestBuilders.get("/api/v1/hospital/search/location")
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
                            fieldWithPath("hospitalId").description("병원 아이디"),
                            fieldWithPath("name").description("병원 이름"),
                            fieldWithPath("address").description("병원 주소")
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
                            fieldWithPath("name").description("병원 이름"),
                            fieldWithPath("address").description("병원 주소")
                        )));
    }
}