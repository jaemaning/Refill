// package com.refill.global.util.runner;

// import com.refill.doctor.entity.Doctor;
// import com.refill.doctor.entity.EducationBackground;
// import com.refill.doctor.entity.MajorArea;
// import com.refill.doctor.repository.DoctorRepository;
// import com.refill.doctor.repository.EducationBackgroundRepository;
// import com.refill.doctor.repository.MajorAreaRepository;
// import com.refill.global.entity.Role;
// import com.refill.hospital.entity.Hospital;
// import com.refill.hospital.repository.HospitalRepository;
// import com.refill.member.entity.Member;
// import com.refill.member.repository.MemberRepository;
// import java.math.BigDecimal;
// import java.time.LocalDate;
// import java.time.LocalDateTime;
// import java.util.Random;
// import lombok.RequiredArgsConstructor;
// import org.springframework.boot.CommandLineRunner;
// import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
// import org.springframework.stereotype.Component;
// import org.springframework.transaction.annotation.Transactional;

// @Component
// @RequiredArgsConstructor
// public class DataInitializer implements CommandLineRunner {

//     private final MemberRepository memberRepository;
//     private final HospitalRepository hospitalRepository;
//     private final DoctorRepository doctorRepository;
//     private final MajorAreaRepository majorAreaRepository;
//     private final EducationBackgroundRepository educationBackgroundRepository;

//     @Override
//     @Transactional
//     public void run(String... args) throws Exception {
//         BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();

//         String[] si = {"서울특별시", "수원시", "광주광역시", "대전광역시", "부산광역시", "구미시"};
//         String[] gu = {"광산구", "종로구", "용산구", "동구", "남구", "수정구", "유성구", "덕진구", "분당구"};
//         String[] building = {"타워펠리스 3차", "파키원 타워", "롯데타워", "운체강 타워", "외피드 타워"};

//         /* 관리자 생성 */
//         Member admin = Member.builder()
//                              .name("신호인")
//                              .loginId("admin")
//                              .nickname("관리자")
//                              .birthDay(LocalDate.of(1983, 1, 1))
//                              .profileImg("ADMIN_PROFILE_IMG_ADDRESS")
//                              .address("광주광역시 광산구 윗마을")
//                              .email("hoin123@naver.com")
//                              .loginPassword(bCryptPasswordEncoder.encode("1234"))
//                              .role(Role.ROLE_ADMIN)
//                              .tel("010-1234-1234")
//                              .createdAt(LocalDateTime.now())
//                              .updatedAt(LocalDateTime.now())
//                              .build();
//         memberRepository.save(admin);

//         for(int i=0; i<20; i++){

//             Random random = new Random();
//             double randomDouble = random.nextDouble();

//             /* 일반 회원 생성 */
//             String address = si[i % si.length] + gu[i % gu.length] + building[i % building.length];
//             Member member = Member.builder()
//                                   .name("member" + i)
//                                   .loginId("member" + i)
//                                   .nickname("일반유저" + i)
//                                   .birthDay(LocalDate.of(2000, 1, 1))
//                                   .profileImg("MEMBER_PROFILE_IMG_ADDRESS")
//                                   .address(address)
//                                   .email("member" + i + "@google.com")
//                                   .loginPassword(bCryptPasswordEncoder.encode("1234"))
//                                   .role(Role.ROLE_MEMBER)
//                                   .tel("010-5678-5678")
//                                   .createdAt(LocalDateTime.now())
//                                   .updatedAt(LocalDateTime.now()).build();
//             memberRepository.save(member);

//             /* 병원 생성 */
//             String[] hospitalName = {
//                 "드림헤어라인의원", "오라클피부과", "맥스웰피부과",
//                 "헬스켈병원", "광주더모의원", "젬마모발이식센터",
//                 "참닥터의원", "더블랙의원 강남", "모텐셜의원",
//                 "모앤블레스의원"};

//             Hospital hospital = Hospital.builder()
//                                         .name(hospitalName[i % 10])
//                                         .address(address)
//                                         .email("hospital_" + i + "@samsung.com")
//                                         .loginId("hospital" + i)
//                                         .loginPassword(
//                                             bCryptPasswordEncoder.encode("1234")) //1234
//                                         .role(i == 4 ? Role.ROLE_GUEST : Role.ROLE_HOSPITAL)
//                                         .tel("02-2345-3465")
//                                         .hospitalBannerImg("HOS_BANNER_IMG_ADDRESS"+i)
//                                         .hospitalProfileImg("HOS_PROFILE_IMG_ADDRESS"+i)
//                                         .latitude(BigDecimal.valueOf(randomDouble))
//                                         .longitude(BigDecimal.valueOf(randomDouble))
//                                         .postalCode(
//                                             String.valueOf(random.nextInt(90000)+10000))
//                                         .registrationImg("HOS_REG_IMG_ADDRESS" + i)
//                                         .build();
//             hospitalRepository.save(hospital);



//             String[] firstName = {"김", "이", "박", "신", "유", "최"};
            
//             /* 의사 생성 */
//             Doctor doctor = Doctor.builder()
//                                   .name(firstName[i % firstName.length] + "의사")
//                                   .profileImg("DOCTOR_PROFILE_IMG_ADDRESS")
//                                   .licenseImg("DOCTOR_LICENSE_IMG_ADDRESS")
//                                   .licenseNumber("DOC-LN-2123-" + i)
//                                   .description("한국 미용 성형학회 자문의원\nIBCS\n모발이식의 대가")
//                                   .hospital(hospital)
//                                   .build();
//             doctorRepository.save(doctor);


//             /* 주요 진료 분야 */
//             String[] major = {"탈모 진단 및 진행 추적", "줄기세포 모발 이식 시술", "컨설팅"};
//             for(int j=0; j<major.length; j++){
//                 MajorArea majorArea = MajorArea.builder()
//                                                .doctor(doctor)
//                                                .content(major[j])
//                                                .build();
//                 majorAreaRepository.save(majorArea);
//             }

//             /* 학력 */
//             String[] edu = {"서울대학교 대학원 졸업", "경희대학교 의과대학 졸업"};
//             for(int j=0; j<edu.length; j++){
//                 EducationBackground educationBackground = EducationBackground.builder()
//                                                                              .doctor(doctor)
//                                                                              .content(edu[j])
//                                                                              .build();
//                 educationBackgroundRepository.save(educationBackground);
//             }
//         }
//     }
// }
