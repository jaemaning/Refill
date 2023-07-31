package com.refill.account.controller;

import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.multipart;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.preprocessRequest;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.prettyPrint;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.requestPartFields;
import static org.springframework.restdocs.request.RequestDocumentation.partWithName;
import static org.springframework.restdocs.request.RequestDocumentation.requestParts;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.refill.account.dto.request.MemberJoinRequest;
import com.refill.util.ControllerTest;
import java.nio.charset.StandardCharsets;
import java.time.LocalDate;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.restdocs.payload.JsonFieldType;

class AccountControllerTest extends ControllerTest {


    @Test
    @DisplayName("멤버_회원가입_성공한다")
    void joinMemberTest() throws Exception {

        MemberJoinRequest memberJoinRequest = new MemberJoinRequest("member01", "pass01", "상원", "신상원", "hello", "01012345667",
            LocalDate.of(1995, 9, 24), "sangwon01@ssafy.com");

        MockMultipartFile memberJoinRequestPart = new MockMultipartFile("memberJoinRequest", "", "application/json", objectMapper.writeValueAsBytes(memberJoinRequest));

        MockMultipartFile profileImgPart =
            new MockMultipartFile("profileImg", "profile.png", "image/png", "<<png data>>".getBytes(
                StandardCharsets.UTF_8));

        //doNothing().when(accountService).memberJoin(any(), any()); 이게 없어도 되는건가 ...

        mockMvc.perform(
            multipart("/api/v1/account/member/join")
                .file(memberJoinRequestPart)
                .file(profileImgPart)
        ).andExpect(status().isNoContent())
         .andDo(
            document("account/member/join",
                preprocessRequest(prettyPrint()),
                requestParts(
                    partWithName("memberJoinRequest").description("회원가입 폼"),
                    partWithName("profileImg").description("프로필 사진").optional()
                ),
                requestPartFields("memberJoinRequest",
                    fieldWithPath("loginId").type(JsonFieldType.STRING).description("로그인 아이디"),
                    fieldWithPath("loginPassword").type(JsonFieldType.STRING).description("로그인 패스워드"),
                    fieldWithPath("name").type(JsonFieldType.STRING).description("이름"),
                    fieldWithPath("nickname").type(JsonFieldType.STRING).description("닉네임"),
                    fieldWithPath("address").type(JsonFieldType.STRING).description("주소"),
                    fieldWithPath("tel").type(JsonFieldType.STRING).description("핸드폰번호"),
                    fieldWithPath("birthDay").type(JsonFieldType.STRING).description("생일"),
                    fieldWithPath("email").type(JsonFieldType.STRING).description("이메일")
                )
            )
        );
    }
}