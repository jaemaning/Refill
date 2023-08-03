package com.refill.reservation.service;

import static org.junit.jupiter.api.Assertions.*;

import com.refill.hospital.entity.Hospital;
import com.refill.member.entity.Member;
import com.refill.util.ServiceTest;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.transaction.annotation.Transactional;

class ReservationServiceTest extends ServiceTest {

    @BeforeEach
    void tearUp() throws Exception {
        memberInfoGenerator();
        hospitalInfoGenerator();
    }

    @Transactional
    @Test
    void t1() {
        Hospital hospital = hospitalService.findById(1L);
        Member member = memberService.findByLoginId("admin");
        System.out.println(member.toString());
    }
}