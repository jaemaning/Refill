package com.refill.consulting.repository;

import com.refill.consulting.entity.Consulting;
import com.refill.member.entity.Member;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ConsultingRepository extends JpaRepository<Consulting, Long> {

    Consulting findConsultingBySessionId(String sessionId);

    @Query("SELECT c FROM Consulting c WHERE c.doctor.id = :doctorId AND c.reservation.id = :reservationId")
    Consulting findConsultingByDoctorAndReservation(@Param("doctorId") Long doctorId, @Param("reservationId") Long reservationId);

    @Query("SELECT c FROM Consulting c WHERE c.member.id = :memberId AND c.reservation.id = :reservationId")
    Consulting findConsultingByMemberAndReservation(@Param("memberId") Long memberId, @Param("reservationId") Long reservationId);

//    List<Consulting> findConsultingsByMember(Member member);

    @Query("SELECT c FROM Consulting c WHERE c.member.id = :memberId AND c.isExecuted = false")
    List<Consulting> findConsultingsByMember(@Param("memberId") Long memberId);

    Consulting findConsultingById(Long consultingId);
}
