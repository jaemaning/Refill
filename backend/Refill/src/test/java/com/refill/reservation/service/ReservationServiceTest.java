package com.refill.reservation.service;

import static org.assertj.core.api.Assertions.assertThat;

import com.refill.doctor.entity.Doctor;
import com.refill.member.entity.Member;
import com.refill.reservation.dto.response.DisabledReservationTimeResponse;
import com.refill.reservation.dto.response.ReservationListResponse;
import com.refill.reservation.entity.Reservation;
import com.refill.reservation.repository.ReservationRepository;
import com.refill.util.ServiceTest;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

class ReservationServiceTest extends ServiceTest {

    @Autowired
    ReservationRepository reservationRepository;

    @BeforeEach
    void tearUp() throws Exception {
        memberInfoGenerator();
        hospitalInfoGenerator();
    }

    @DisplayName("회원의_예약목록_조회된다")
    @Transactional
    @Test
    void t1() {
        //given
        Doctor doctor = doctorService.findById(1L);
        Member member = memberService.findByLoginId("member01");

        Reservation reservation1 = Reservation.builder()
                                              .member(member)
                                              .doctor(doctor)
                                              .startDateTime(LocalDateTime.now())
                                              .endDateTime(LocalDateTime.now()
                                                                        .plusMinutes(30))
                                              .counselingDemands("고민입니다..")
                                              .build();

        Reservation reservation2 = Reservation.builder()
                                              .member(member)
                                              .doctor(doctor)
                                              .startDateTime(LocalDateTime.now()
                                                                          .plusMinutes(30))
                                              .endDateTime(LocalDateTime.now()
                                                                        .plusMinutes(60))
                                              .counselingDemands("고민이 많습니다..")
                                              .build();

        //when
        reservationRepository.save(reservation1);
        reservationRepository.save(reservation2);

        List<ReservationListResponse> responseList = reservationService.findAllByMember(
            member.getLoginId());
        //then
        assertThat(responseList).satisfies(
            list -> assertThat(list.size()).isEqualTo(2)
        );

    }

    @DisplayName("의사의_예약_불가능한_시간_조회된다")
    @Transactional
    @Test
    void t2() throws Exception {

        //given
        Doctor doctor = doctorService.findById(1L);
        Member member = memberService.findByLoginId("member01");

        LocalTime localTime1 = LocalTime.of(9, 0);
        LocalTime localTime2 = LocalTime.of(10, 0);

        LocalDate localDate = LocalDate.now().plusDays(1L);

        LocalDateTime localDateTime1 = LocalDateTime.of(localDate, localTime1);
        LocalDateTime localDateTime2 = LocalDateTime.of(localDate, localTime2);

        Reservation reservation1 = Reservation.builder()
                                              .member(member)
                                              .doctor(doctor)
                                              .startDateTime(localDateTime1)
                                              .endDateTime(localDateTime1
                                                  .plusMinutes(30))
                                              .counselingDemands("고민입니다..")
                                              .build();

        Reservation reservation2 = Reservation.builder()
                                              .member(member)
                                              .doctor(doctor)
                                              .startDateTime(localDateTime2)
                                              .endDateTime(localDateTime2.plusMinutes(30))
                                              .counselingDemands("고민이 많습니다..")
                                              .build();

        //when
        reservationRepository.save(reservation1);
        reservationRepository.save(reservation2);

        List<DisabledReservationTimeResponse> disabledList = reservationService.findDisabledTimeByDoctor(
            doctor.getId());
        //then
        assertThat(disabledList).satisfies(
            list -> assertThat(list.size()).isEqualTo(2),
            list -> assertThat(list.stream()
                                   .map(x -> x.startDateTime())
                                   .anyMatch(y -> y.equals(localDateTime1)))
        );
    }

}