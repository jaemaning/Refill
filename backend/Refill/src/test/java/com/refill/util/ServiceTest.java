package com.refill.util;

import com.refill.account.service.AccountService;
import com.refill.aidiagnosis.service.AiDiagnosisService;
import com.refill.doctor.entity.Doctor;
import com.refill.doctor.entity.EducationBackground;
import com.refill.doctor.entity.MajorArea;
import com.refill.doctor.repository.EducationBackgroundRepository;
import com.refill.doctor.repository.MajorAreaRepository;
import com.refill.doctor.service.DoctorService;
import com.refill.global.entity.Role;
import com.refill.global.service.AmazonS3Service;
import com.refill.global.service.AmazonSESService;
import com.refill.hospital.entity.Hospital;
import com.refill.hospital.service.HospitalService;
import com.refill.member.service.MemberService;
import com.refill.reservation.service.ReservationService;
import java.math.BigDecimal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

@ActiveProfiles("test")
@SpringBootTest
public class ServiceTest {

    @Autowired protected MemberService memberService;
    @Autowired protected HospitalService hospitalService;
    @Autowired protected AccountService accountService;
    @Autowired protected AiDiagnosisService aiDiagnosisService;
    @Autowired protected ReservationService reservationService;
    @Autowired protected DoctorService doctorService;

    @Autowired protected MajorAreaRepository majorAreaRepository;
    @Autowired protected EducationBackgroundRepository educationBackgroundRepository;
    @Autowired protected BCryptPasswordEncoder passwordEncoder;

    @MockBean protected AmazonS3Service amazonS3Service;
    @MockBean protected AmazonSESService amazonSESService;

    @Transactional
    protected void hospitalInfoGenerator() {
        // 병원 생성
        Hospital hospital = Hospital.builder()
                                    .name("오라클 탈모병원")
                                    .address("광주광역시")
                                    .email("hospital@ssafy.com")
                                    .loginId("hospital01")
                                    .loginPassword(
                                        passwordEncoder.encode("1234")) //1234
                                    .role(Role.ROLE_HOSPITAL)
                                    .tel("02-2345-3465")
                                    .hospitalBannerImg("HOS_BANNER_IMG_ADDRESS")
                                    .hospitalProfileImg("HOS_PROFILE_IMG_ADDRESS")
                                    .latitude(BigDecimal.valueOf(1.234))
                                    .longitude(BigDecimal.valueOf(2.456))
                                    .postalCode("12345")
                                    .registrationImg("HOS_REG_IMG_ADDRESS")
                                    .build();
        hospitalService.save(hospital);
        Hospital savedHospital = hospitalService.findByLoginId("hospital01");


        // 의사
        Doctor doctor = Doctor.builder()
                              .name("신호인")
                              .profileImg("DOCTOR_PROFILE_IMG_ADDRESS")
                              .licenseImg("DOCTOR_LICENSE_IMG_ADDRESS")
                              .licenseNumber("DOC-LN-2123-123")
                              .description("한국 미용 성형학회 자문의원\nIBCS\n모발이식의 대가")
                              .hospital(savedHospital)
                              .build();

        doctorService.save(doctor);
        savedHospital.getDoctors().add(doctor);
        hospitalService.save(savedHospital);
        // 진료분야
        MajorArea majorArea = MajorArea.builder()
                                       .doctor(doctor)
                                       .content("탈모 진단 및 진행 추적")
                                       .build();

        majorAreaRepository.save(majorArea);

        // 학력
            EducationBackground educationBackground = EducationBackground.builder()
                                                                         .doctor(doctor)
                                                                         .content("경희대학교 의과대학")
                                                                         .build();
            educationBackgroundRepository.save(educationBackground);
    }


}
