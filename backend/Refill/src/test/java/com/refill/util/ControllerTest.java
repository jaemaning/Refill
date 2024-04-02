package com.refill.util;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.refill.account.controller.AccountController;
import com.refill.account.client.AccountClientComposite;
import com.refill.account.service.AccountService;
import com.refill.account.client.HospitalClient;
import com.refill.account.client.MemberClient;
import com.refill.admin.controller.AdminController;
import com.refill.admin.service.AdminService;
import com.refill.aidiagnosis.controller.AiDiagnosisController;
import com.refill.aidiagnosis.service.AiDiagnosisService;
import com.refill.consulting.service.ConsultingService;
import com.refill.hospital.controller.HospitalController;
import com.refill.hospital.repository.HospitalRepository;
import com.refill.hospital.service.HospitalOperatingHourService;
import com.refill.hospital.service.HospitalService;
import com.refill.member.controller.MemberController;
import com.refill.member.repository.MemberRepository;
import com.refill.member.service.MemberService;
import com.refill.reservation.controller.ReservationController;
import com.refill.reservation.service.ReservationService;
import com.refill.review.controller.ReviewController;
import com.refill.review.service.ReviewService;
import com.refill.security.service.UserDetailServiceImpl;
import com.refill.security.util.JwtProvider;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import javax.persistence.EntityManagerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

@AutoConfigureRestDocs
@ActiveProfiles("test")
@MockBean(JpaMetamodelMappingContext.class)
@AutoConfigureMockMvc(addFilters = false)
@WebMvcTest({
    AccountController.class,
    MemberController.class,
    HospitalController.class,
    AdminController.class,
    ReviewController.class,
    ReservationController.class,
    AiDiagnosisController.class
})
public class ControllerTest {

    // Util
    @Autowired protected MockMvc mockMvc;
    @Autowired protected ObjectMapper objectMapper;

    @MockBean protected JwtProvider jwtProvider;

    @Value("${jwt.token.secret}")
    protected String secretKey;

    // Service
    @MockBean protected AccountService accountService;
    @MockBean protected MemberService memberService;
    @MockBean protected HospitalService hospitalService;
    @MockBean protected AdminService adminService;
    @MockBean protected AiDiagnosisService aiDiagnosisService;
    @MockBean protected ReservationService reservationService;
    @MockBean protected HospitalOperatingHourService hospitalOperatingHourService;
    @MockBean protected ReviewService reviewService;
    @MockBean protected ConsultingService consultingService;
    @MockBean protected UserDetailServiceImpl userDetailService;
    @MockBean protected AccountClientComposite accountClientComposite;
    @MockBean protected MemberClient memberClient;
    @MockBean protected HospitalClient hospitalClient;

    // Repository
    @MockBean protected MemberRepository memberRepository;
    @MockBean protected HospitalRepository hospitalRepository;
    @MockBean EntityManagerFactory managerFactory;

    protected String createToken(String loginId, String secretKey) {

        final long accessTokenExpireTimeMs = 3600000L; // 1시간
        final long refreshTokenExpireTimeMs = 1209600000L; // 2주일

        Claims claims = Jwts.claims();
        claims.put("loginId", loginId);

        Date now = new Date();
        Date accessTokenExpiration = new Date(now.getTime() + accessTokenExpireTimeMs);
        Date refreshTokenExpiration = new Date(now.getTime() + refreshTokenExpireTimeMs);

        return Jwts.builder()
                   .setClaims(claims)
                   .setIssuedAt(now)
                   .setExpiration(accessTokenExpiration)
                   .signWith(
                                     Keys.hmacShaKeyFor(secretKey.getBytes(StandardCharsets.UTF_8)),
                                     SignatureAlgorithm.HS256)
                   .compact();

    }
}
