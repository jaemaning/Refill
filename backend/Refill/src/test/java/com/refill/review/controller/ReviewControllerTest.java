package com.refill.review.controller;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import com.refill.global.entity.Role;
import com.refill.review.dto.request.ReviewCreateRequest;
import com.refill.review.dto.request.ReviewModifyRequest;
import com.refill.review.dto.response.ReviewResponse;
import com.refill.security.util.LoginInfo;
import com.refill.util.ControllerTest;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Arrays;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.TestingAuthenticationToken;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;

import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.get;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.post;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.put;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.preprocessResponse;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.prettyPrint;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.requestBody;
import static org.springframework.restdocs.payload.PayloadDocumentation.requestFields;
import static org.springframework.restdocs.payload.PayloadDocumentation.responseFields;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import static org.springframework.restdocs.request.RequestDocumentation.pathParameters;
import static org.springframework.restdocs.request.RequestDocumentation.requestParameters;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


public class ReviewControllerTest extends ControllerTest {

    private ReviewResponse mockResponse1, mockResponse2;

    @BeforeEach
    public void createReviewResponse(){
        ReviewResponse mock1 = new ReviewResponse(1L, 3, "좋았습니다", 1L, "시그널만13", 1L,
            "김승현 의사", 1L, "성남탈모전문병원",
            LocalDate.now()
                     .format(DateTimeFormatter.ofPattern("YYYY.MM.dd")), "모발이식");

        ReviewResponse mock2 = new ReviewResponse(2L, 3, "좋았습니다", 1L, "시그널만13", 1L,
            "김승현 의사", 1L, "성남탈모전문병원",
            LocalDate.now()
                     .format(DateTimeFormatter.ofPattern("YYYY.MM.dd")), "모발이식");

        mockResponse1 = mock1;
        mockResponse2 = mock2;
    }

    @Test
    @DisplayName("리뷰 전체 조회")
    public void getReview() throws Exception {


        when(reviewService.getReviews()).thenReturn(Arrays.asList(mockResponse1, mockResponse2));

        this.mockMvc.perform(
                get("/api/v1/review"))
                    .andExpect(status().isOk())
                    .andDo(document("review/findAll",
                            preprocessResponse(prettyPrint()),
                        responseFields(
                            fieldWithPath("[].reviewId").description("리뷰 ID"),
                            fieldWithPath("[].score").description("리뷰 평점"),
                            fieldWithPath("[].content").description("리뷰 내용"),
                            fieldWithPath("[].memberId").description("작성자 ID"),
                            fieldWithPath("[].nickname").description("작성자 닉네임"),
                            fieldWithPath("[].doctorId").description("의사 ID"),
                            fieldWithPath("[].doctorName").description("의사 이름"),
                            fieldWithPath("[].hospitalId").description("병원 ID"),
                            fieldWithPath("[].hospitalName").description("병원 이름"),
                            fieldWithPath("[].updateDate").description("업데이트 날짜"),
                            fieldWithPath("[].category").description("리뷰 카테고리")
                        )
                        )
                    );
    }
    
    
    
    @Test
    @DisplayName("리뷰 단건 조회 테스트")
    public void getReviewById() throws Exception {

        when(reviewService.getReviewById(any())).thenReturn(mockResponse1);

        this.mockMvc.perform(get("/api/v1/review/{reviewId}", 1L))
                    .andExpect(status().isOk())
                    .andDo(document("review/getReviewById",
                        preprocessResponse(prettyPrint()),
                        pathParameters(
                            parameterWithName("reviewId").description("리뷰 ID")
                        ),
                        responseFields(
                            fieldWithPath("reviewId").description("리뷰 ID"),
                            fieldWithPath("score").description("리뷰 평점"),
                            fieldWithPath("content").description("리뷰 내용"),
                            fieldWithPath("memberId").description("작성자 ID"),
                            fieldWithPath("nickname").description("작성자 닉네임"),
                            fieldWithPath("doctorId").description("의사 ID"),
                            fieldWithPath("doctorName").description("의사 이름"),
                            fieldWithPath("hospitalId").description("병원 ID"),
                            fieldWithPath("hospitalName").description("병원 이름"),
                            fieldWithPath("updateDate").description("업데이트 날짜"),
                            fieldWithPath("category").description("리뷰 카테고리")
                        )));
    }

    @Test
    @DisplayName("리뷰 생성 테스트")
    public void createReview() throws Exception {

        ReviewCreateRequest reviewCreateRequest = new ReviewCreateRequest(1L, 1L, 1L, "좋았습니다.",
            "모발이식", 4);
        doNothing().when(reviewService).createReview(reviewCreateRequest);

        this.mockMvc.perform(post("/api/v1/review").contentType(MediaType.APPLICATION_JSON).content(objectMapper.writeValueAsString(reviewCreateRequest)))
                    .andExpect(status().isOk())
                    .andDo(document("review/createReview", preprocessResponse(prettyPrint()),
                        requestFields(
                            fieldWithPath("score").description("리뷰 평점"),
                            fieldWithPath("content").description("리뷰 내용"),
                            fieldWithPath("memberId").description("작성자 ID"),
                            fieldWithPath("doctorId").description("의사 ID"),
                            fieldWithPath("hospitalId").description("병원 ID"),
                            fieldWithPath("category").description("리뷰 카테고리")
                        )
                    ));
    }
    
    @Test
    @DisplayName("리뷰 수정 테스트")
    public void modifyReview() throws Exception {

        ReviewModifyRequest mockRequest = new ReviewModifyRequest("리뷰 수정합니다.", 5);
        doNothing().when(reviewService)
                   .modifyReview(1L, mockRequest, "hoin12");

        LoginInfo mockLoginInfo = new LoginInfo("sample_login_id", Role.ROLE_HOSPITAL);
        SecurityContext securityContext = SecurityContextHolder.createEmptyContext();
        securityContext.setAuthentication(new TestingAuthenticationToken(mockLoginInfo, null));
        SecurityContextHolder.setContext(securityContext);

        this.mockMvc.perform(
                put("/api/v1/review/{reviewId}", 1L).contentType(MediaType.APPLICATION_JSON).content(
                    objectMapper.writeValueAsBytes(mockRequest)))
                    .andExpect(status().isNoContent())
                    .andDo(document("review/modify",
                        preprocessResponse(prettyPrint()),
                        pathParameters(
                            parameterWithName("reviewId").description("리뷰ID")
                        ),
                        requestFields(
                            fieldWithPath("content").description("리뷰 내용"),
                            fieldWithPath("score").description("리뷰 평점")
                        )
                    ));
    }


    @Test
    @DisplayName("리뷰 삭제 테스트")
    public void deleteReview(){

    }
    
    @Test
    @DisplayName("리뷰 신고 테스트")
    public void reportReview(){

    }
    
    
    

}
