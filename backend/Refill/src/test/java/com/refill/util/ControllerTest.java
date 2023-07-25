package com.refill.util;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.refill.account.controller.AccountController;
import com.refill.account.service.AccountService;
import com.refill.hospital.repository.HospitalRepository;
import com.refill.hospital.service.HospitalService;
import com.refill.member.repository.MemberRepository;
import com.refill.member.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

@AutoConfigureRestDocs
@ActiveProfiles("test")
@WebMvcTest({
    AccountController.class
})
public class ControllerTest {

    // Util
    @Autowired protected MockMvc mockMvc;
    @Autowired protected ObjectMapper objectMapper;

    // Service
    @MockBean protected AccountService accountService;
    @MockBean protected MemberService memberService;
    @MockBean protected HospitalService hospitalService;

    // Repository
    @MockBean protected MemberRepository memberRepository;
    @MockBean protected HospitalRepository hospitalRepository;
}
