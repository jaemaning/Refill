package com.refill.member.controller;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.doNothing;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.get;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.multipart;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.put;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.preprocessRequest;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.preprocessResponse;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.prettyPrint;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.requestFields;
import static org.springframework.restdocs.payload.PayloadDocumentation.requestPartFields;
import static org.springframework.restdocs.payload.PayloadDocumentation.responseFields;
import static org.springframework.restdocs.request.RequestDocumentation.partWithName;
import static org.springframework.restdocs.request.RequestDocumentation.requestParts;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.authentication;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.refill.global.entity.Role;
import com.refill.member.dto.request.MemberInfoUpdateRequest;
import com.refill.member.dto.request.MemberPasswordUpdateRequest;
import com.refill.member.dto.response.MemberInfoResponse;
import com.refill.security.util.LoginInfo;
import com.refill.util.ControllerTest;
import java.nio.charset.StandardCharsets;
import java.time.LocalDate;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.security.authentication.TestingAuthenticationToken;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.test.context.support.WithMockUser;

class MemberControllerTest extends ControllerTest {

    @Test
    @WithMockUser(username = "testUser", roles = "MEMBER")
    @DisplayName("회원_마이페이지_조회된다")
    public void getMemberInfoTest() throws Exception {
        // Given
//        String loginId = "testUser";
//        String token = createToken(loginId, secretKey);

        LoginInfo loginInfo = new LoginInfo("testUser", Role.ROLE_MEMBER);
        SecurityContext securityContext = SecurityContextHolder.createEmptyContext();
        securityContext.setAuthentication(new TestingAuthenticationToken(loginInfo, null));
        SecurityContextHolder.setContext(securityContext);
        MemberInfoResponse response = new MemberInfoResponse("testName", "testAddress",
            LocalDate.now(), "testTel", "testNick", "testEmail", "testImg");

        given(memberService.getMemberByLoginId(any())).willReturn(response);

        // When & Then
        mockMvc.perform(
                   get("/api/v1/member/mypage")
                       .with(authentication(new TestingAuthenticationToken(loginInfo, null)))
                       .contentType(MediaType.APPLICATION_JSON)
               )
               .andExpect(status().isOk())
               .andDo(
                   document("member/get-mypage",
                       preprocessResponse(prettyPrint()),
                       responseFields(
                           fieldWithPath("name").description("이름"),
                           fieldWithPath("address").description("주소"),
                           fieldWithPath("birthDay").description("생일"),
                           fieldWithPath("tel").description("전화번호"),
                           fieldWithPath("nickname").description("닉네임"),
                           fieldWithPath("email").description("이메일"),
                           fieldWithPath("profileImg").description("프로필 사진")
                                                      .optional()
                       )
                   ));
    }

    @Test
    @WithMockUser(username = "testUser", roles = "MEMBER")
    @DisplayName("회원_정보_수정된다")
    public void modifyMemberInfoTest() throws Exception {
        // Given
        LoginInfo loginInfo = new LoginInfo("testUser", Role.ROLE_MEMBER);
        SecurityContext securityContext = SecurityContextHolder.createEmptyContext();
        securityContext.setAuthentication(new TestingAuthenticationToken(loginInfo, null));
        SecurityContextHolder.setContext(securityContext);
        MemberInfoUpdateRequest memberInfoUpdateRequest = new MemberInfoUpdateRequest("testName",
            "testAddress", LocalDate.now(), "testTel", "testNick", "testEmail");

        MockMultipartFile memberInfoUpdateRequestPart =
            new MockMultipartFile("memberInfoUpdateRequest", "", "application/json",
                objectMapper.writeValueAsBytes(memberInfoUpdateRequest));

        MockMultipartFile profileImgPart =
            new MockMultipartFile("profileImg", "profile.png", "image/png", "<<png data>>".getBytes(
                StandardCharsets.UTF_8));

        doNothing().when(memberService).modifyMember(any(), any(), any());

        mockMvc.perform(
                   multipart("/api/v1/member/mypage")
                       .file(memberInfoUpdateRequestPart)
                       .file(profileImgPart)
                       .with(authentication(new TestingAuthenticationToken(loginInfo, null)))

                       .with(request -> {  // HTTP 메소드를 PUT으로 설정
                           request.setMethod("PUT");
                           return request;
                       })
               )
               .andExpect(status().isNoContent())
               .andDo(
                   document("member/put-mypage",
                       preprocessRequest(prettyPrint()),
                       requestParts(
                           partWithName("memberInfoUpdateRequest").description(
                               "The member info update request"),
                           partWithName("profileImg").description("The profile image")
                                                     .optional()
                       ),
                       requestPartFields("memberInfoUpdateRequest",
                           fieldWithPath("name").description("이름"),
                           fieldWithPath("address").description("주소"),
                           fieldWithPath("birthDay").description("생일"),
                           fieldWithPath("tel").description("전화번호"),
                           fieldWithPath("nickname").description("닉네임"),
                           fieldWithPath("email").description("이메일")
                       )
                   )
               );
    }

    @Test
    @WithMockUser(username = "testUser", roles = "MEMBER")
    @DisplayName("회원_비밀번호_수정된다")
    public void modifyMemberPasswordTest() throws Exception {
        // Given
        LoginInfo loginInfo = new LoginInfo("testUser", Role.ROLE_MEMBER);
        SecurityContext securityContext = SecurityContextHolder.createEmptyContext();
        securityContext.setAuthentication(new TestingAuthenticationToken(loginInfo, null));
        SecurityContextHolder.setContext(securityContext);
        MemberPasswordUpdateRequest memberPasswordUpdateRequest = new MemberPasswordUpdateRequest("old", "new");

        doNothing().when(memberService).modifyPassword(any(), any());

        mockMvc.perform(
                   put("/api/v1/member/mypage/password")
                       .with(authentication(new TestingAuthenticationToken(loginInfo, null)))

                       .contentType(MediaType.APPLICATION_JSON)
                       .content(objectMapper.writeValueAsBytes(memberPasswordUpdateRequest))
               )
               .andExpect(status().isNoContent())
               .andDo(
                   document("member/mypage/password",
                       preprocessRequest(prettyPrint()),
                       requestFields(
                           fieldWithPath("oldPassword").type(JsonFieldType.STRING).description("기존 비밀번호"),
                           fieldWithPath("newPassword").type(JsonFieldType.STRING).description("새로운 비밀번호")
                       )
                   )
               );
    }

}