package com.refill.reservation.repository;

import com.refill.doctor.entity.Doctor;
import com.refill.member.entity.Member;
import com.refill.reservation.entity.Reservation;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {

    List<Reservation> findAllByMember(Member member);

    @Query("SELECT r.startDateTime FROM Reservation r WHERE r.doctor.id = :doctorId AND r.startDateTime >= :today")
    List<LocalDateTime> findFutureStartTimesByDoctor(@Param("doctorId") Long doctorId, @Param("today") LocalDateTime today);

    boolean existsByDoctorAndStartDateTime(Doctor doctor, LocalDateTime startDateTime);

    boolean existsByMemberAndStartDateTime(Member member, LocalDateTime startDateTime);

    @Query("SELECT r FROM Reservation r WHERE r.startDateTime BETWEEN :start AND :end AND r.isCanceled = false")
    List<Reservation> findReservationReady(@Param("start") LocalDateTime readyMinusOneMinute, @Param("end") LocalDateTime readyPlusOneMinute);



    List<Reservation> findByDoctorAndStartDateTimeAfter(Doctor doctor, LocalDateTime dateTime);
}
