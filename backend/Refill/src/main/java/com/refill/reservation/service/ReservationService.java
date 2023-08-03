package com.refill.reservation.service;

import com.refill.doctor.entity.Doctor;
import com.refill.doctor.service.DoctorService;
import com.refill.global.exception.ErrorCode;
import com.refill.global.service.AmazonS3Service;
import com.refill.member.entity.Member;
import com.refill.member.exception.MemberException;
import com.refill.member.service.MemberService;
import com.refill.reservation.dto.request.ReservationRequest;
import com.refill.reservation.dto.response.DisabledReservationTimeResponse;
import com.refill.reservation.dto.response.ReservationListResponse;
import com.refill.reservation.dto.response.ReservationResultResponse;
import com.refill.reservation.entity.Reservation;
import com.refill.reservation.exception.ReservationException;
import com.refill.reservation.repository.ReservationRepository;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import javax.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@RequiredArgsConstructor
@Service
public class ReservationService {

    private final ReservationRepository reservationRepository;
    private final DoctorService doctorService;
    private final MemberService memberService;
    private final AmazonS3Service amazonS3Service;
    private static final int CONSULTING_TIME = 30;

    @Transactional(readOnly = true)
    public List<ReservationListResponse> findAllByMember(String loginId) {

        Member member = memberService.findByLoginId(loginId);

        return reservationRepository.findAllByMember(member)
                                    .stream()
                                    .map(ReservationListResponse::new)
                                    .toList();
    }

    @Transactional(readOnly = true)
    public List<DisabledReservationTimeResponse> findDisabledTimeByDoctor(Long doctorId) {

        return reservationRepository.findFutureStartTimesByDoctor(doctorId, LocalDateTime.now())
                                    .stream()
                                    .map(DisabledReservationTimeResponse::new)
                                    .toList();
    }

    @Transactional
    public ReservationResultResponse makeReservation(String loginId, ReservationRequest reservationRequest, MultipartFile hairImage) {

        Member member = memberService.findByLoginId(loginId);
        Doctor doctor = doctorService.findById(reservationRequest.doctorId());

        availableReservationCheck(doctor, reservationRequest.startDateTime());

        Reservation reservation = Reservation.builder()
                                             .member(member)
                                             .doctor(doctor)
                                             .startDateTime(reservationRequest.startDateTime())
                                             .endDateTime(reservationRequest.startDateTime().plusMinutes(CONSULTING_TIME))
                                             .counselingDemands(reservationRequest.counselingDemands())
                                             .build();

        if(hairImage != null) {
            String address = amazonS3Service.uploadFile(hairImage);
            reservation.updateFileAddress(address);
        }

        reservationRepository.save(reservation);

        return new ReservationResultResponse(reservation);

    }

    private void availableReservationCheck(Doctor doctor, LocalDateTime startDateTime) {

        boolean isAvailable = reservationRepository.existsByDoctorAndStartDateTime(doctor,
            startDateTime);

        if (isAvailable == true) {
            throw new ReservationException(ErrorCode.ALREADY_RESERVED);
        }
    }

    @Transactional
    public void deleteReservation(String loginId, Long reservationId) {

        Member member = memberService.findByLoginId(loginId);
        Reservation reservation = reservationRepository.findById(reservationId).orElseThrow(() -> new EntityNotFoundException());

        if(!Objects.equals(member, reservation.getMember())) {
            throw new MemberException(ErrorCode.UNAUTHORIZED_REQUEST);
        }

        reservationRepository.delete(reservation);

    }
}
