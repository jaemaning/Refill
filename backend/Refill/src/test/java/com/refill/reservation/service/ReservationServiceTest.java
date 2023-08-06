package com.refill.reservation.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatExceptionOfType;

import com.refill.doctor.entity.Doctor;
import com.refill.doctor.repository.DoctorRepository;
import com.refill.hospital.entity.Hospital;
import com.refill.member.entity.Member;
import com.refill.reservation.dto.request.ReservationRequest;
import com.refill.reservation.dto.response.DisabledReservationTimeResponse;
import com.refill.reservation.dto.response.ReservationListResponse;
import com.refill.reservation.entity.Reservation;
import com.refill.reservation.exception.ReservationException;
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
    @Autowired
    DoctorRepository doctorRepository;

    @BeforeEach
    void tearUp() throws Exception {
        memberInfoGenerator();
        hospitalInfoGenerator();

        //given
        Doctor doctor = hospitalService.findByLoginId("hospital01").getDoctors().get(0);
        Member member = memberService.findByLoginId("member01");

        LocalTime localTime1 = LocalTime.of(9, 0);
        LocalTime localTime2 = LocalTime.of(10, 0);

        LocalDate localDate = LocalDate.now()
                                       .plusDays(1L);

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

        reservationRepository.save(reservation1);
        reservationRepository.save(reservation2);
    }

    @DisplayName("회원의_예약목록_조회된다")
    @Transactional
    @Test
    void t1() {
        //given
        //when

        Member member = memberService.findByLoginId("member01");

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


        //when

        Member member = memberService.findByLoginId("member01");
        Doctor doctor = hospitalService.findByLoginId("hospital01").getDoctors().get(0);

        LocalTime localTime1 = LocalTime.of(9, 0);
        LocalDate localDate = LocalDate.now().plusDays(1L);

        LocalDateTime localDateTime1 = LocalDateTime.of(localDate, localTime1);


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

    @DisplayName("예약 시 의사가 이미 예약된 시간이면 ALREADY_RESERVED_EXCEPTION 반환된다")
    @Transactional
    @Test
    void if_already_reservation_time_then_throws_already_reserved() throws Exception {

        Doctor doctor = hospitalService.findByLoginId("hospital01").getDoctors().get(0);
        Member member = memberService.findByLoginId("member01");

        LocalTime localTime1 = LocalTime.of(9, 0);
        LocalDate localDate = LocalDate.now().plusDays(1L);

        LocalDateTime localDateTime1 = LocalDateTime.of(localDate, localTime1);

        ReservationRequest duplicatedRequest = new ReservationRequest(doctor.getId(), localDateTime1, "중복입니다.");

        assertThatExceptionOfType(ReservationException.class)
            .isThrownBy(() -> {
                reservationService.makeReservation(member.getLoginId(), duplicatedRequest, null);
            });
    }

    @DisplayName("회원이 이미 같은 시간에 예약되어 있으면 MEMBER_RESERVATION_DUPLICATED_EXCEPTION 반환된다")
    @Transactional
    @Test
    void if_already_reservation_other_doctor_then_throws_duplicated_exception_reserved() throws Exception{

        Hospital savedHospital = hospitalService.findByLoginId("hospital01");


        Doctor doctor = Doctor.builder()
                              .name("신호호")
                              .profileImg("DOCTOR_PROFILE_IMG_ADDRESS")
                              .licenseImg("DOCTOR_LICENSE_IMG_ADDRESS")
                              .licenseNumber("DOC-LN-2123-1234")
                              .description("한국 미용 성형학회 자문의원")
                              .hospital(savedHospital)
                              .build();

        doctorService.save(doctor);
        savedHospital.getDoctors().add(doctor);

        Doctor savedDoctor = hospitalService.findByLoginId("hospital01").getDoctors().get(1);
        Member member = memberService.findByLoginId("member01");

        LocalTime localTime1 = LocalTime.of(9, 0);

        LocalDate localDate = LocalDate.now().plusDays(1L);

        LocalDateTime localDateTime1 = LocalDateTime.of(localDate, localTime1);

        ReservationRequest duplicatedRequest = new ReservationRequest(savedDoctor.getId(), localDateTime1, "중복입니다.");

        assertThatExceptionOfType(ReservationException.class)
            .isThrownBy(() -> {
                reservationService.makeReservation(member.getLoginId(), duplicatedRequest, null);
            });

    }

    @DisplayName("예약_삭제된다")
    @Transactional
    @Test
    void reservation_delete() throws Exception {

        Member member = memberService.findByLoginId("member01");

        List<ReservationListResponse> list = reservationService.findAllByMember(member.getLoginId());
        reservationService.deleteReservation(member.getLoginId(), list.get(0).reservationId());

        List<ReservationListResponse> responseList = reservationService.findAllByMember(member.getLoginId());

        assertThat(responseList.size()).isEqualTo(1);
    }

}