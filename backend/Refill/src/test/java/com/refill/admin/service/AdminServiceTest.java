package com.refill.admin.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import com.refill.account.dto.request.HospitalJoinRequest;
import com.refill.admin.dto.response.WaitingHospitalResponse;
import com.refill.global.entity.Role;
import com.refill.hospital.entity.Hospital;
import com.refill.util.ServiceTest;
import java.math.BigDecimal;
import java.util.List;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.transaction.annotation.Transactional;

class AdminServiceTest extends ServiceTest {

    @Autowired private AdminService adminService;

    @BeforeEach
    void setUp() throws Exception {
        HospitalJoinRequest joinRequest1 = new HospitalJoinRequest("test01", "test01", "한방병원", "광산구", "23023", new BigDecimal("452.456"), new BigDecimal("123.456"), "010-1234-5324", "ssafy1@ssafy.com");
        HospitalJoinRequest joinRequest2 = new HospitalJoinRequest("test02", "test02", "두방병원", "광산구", "23023", new BigDecimal("452.456"), new BigDecimal("123.456"), "010-1234-5334", "ssafy2@ssafy.com");

        MockMultipartFile profileImg1 = new MockMultipartFile("profileImg", "test.jpg", "image/jpeg", "test image".getBytes());
        MockMultipartFile profileImg2 = new MockMultipartFile("profileImg", "test.jpg", "image/jpeg", "test image".getBytes());

        MockMultipartFile regImg1 = new MockMultipartFile("regImg", "test.jpg", "image/jpeg", "test image".getBytes());
        MockMultipartFile regImg2 = new MockMultipartFile("regImg", "test.jpg", "image/jpeg", "test image".getBytes());

        when(amazonS3Service.uploadFile(any(MockMultipartFile.class))).thenReturn("SUCCESS");

        accountService.hospitalJoin(joinRequest1, profileImg1, regImg1);
        accountService.hospitalJoin(joinRequest2, profileImg2, regImg2);
    }

    @Test
    @Transactional
    @DisplayName("가입 대기중인 병원들이 조회된다.")
    void t1() throws Exception {

        List<WaitingHospitalResponse> hospitalList = adminService.findHospitalsByWaiting();
        hospitalList.forEach(x -> System.out.println(x.toString()));
        assertEquals(2, hospitalList.size());


    }

    @Test
    @Transactional
    @DisplayName("가입_승인된다")
    void t2() throws Exception {

        List<WaitingHospitalResponse> hospitalList = adminService.findHospitalsByWaiting();
        hospitalList.forEach(x -> System.out.println(x.toString()));
        assertEquals(2, hospitalList.size());

        adminService.acceptHospital(hospitalList.get(0).id());
        Hospital hospital = hospitalService.findById(hospitalList.get(0).id());
        hospitalList = adminService.findHospitalsByWaiting();
        assertEquals(1, hospitalList.size());
        assertEquals(Role.ROLE_HOSPITAL, hospital.getRole());
    }


}