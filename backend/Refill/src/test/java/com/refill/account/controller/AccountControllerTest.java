package com.refill.account.controller;

import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.post;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.preprocessRequest;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.prettyPrint;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.requestFields;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.refill.account.dto.request.MemberJoinRequest;
import com.refill.util.ControllerTest;
import java.time.LocalDate;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.security.test.context.support.WithMockUser;

class AccountControllerTest extends ControllerTest {


    @Test
    @WithMockUser
    @DisplayName("회원가입_성공한다")
    void t1() throws Exception {

        MemberJoinRequest memberJoinRequest = new MemberJoinRequest("member01", "pass01", "상원", "신상원", "hello", "01012345667",
            LocalDate.of(1995, 9, 24), "sangwon01@ssafy.com", "sfar3fasdf");

        mockMvc.perform(post("/api/v1/account/member/join")
            .with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsBytes(memberJoinRequest))
        ).andDo(
            document("account/member/join",
                preprocessRequest(prettyPrint()),
                requestFields(
                    fieldWithPath("loginId").type(JsonFieldType.STRING).description("로그인 아이디"),
                    fieldWithPath("loginPassword").type(JsonFieldType.STRING).description("로그인 패스워드"),
                    fieldWithPath("name").type(JsonFieldType.STRING).description("이름"),
                    fieldWithPath("nickname").type(JsonFieldType.STRING).description("닉네임"),
                    fieldWithPath("address").type(JsonFieldType.STRING).description("주소"),
                    fieldWithPath("tel").type(JsonFieldType.STRING).description("핸드폰번호"),
                    fieldWithPath("birthDay").type(JsonFieldType.STRING).description("생일"),
                    fieldWithPath("email").type(JsonFieldType.STRING).description("이메일"),
                    fieldWithPath("profileImg").type(JsonFieldType.STRING).description("프로필사진").optional()
                )
            )
        ).andExpect(status().isOk());
    }
}