package com.refill.consulting.repository;

import com.refill.consulting.entity.Consulting;
import com.refill.member.entity.Member;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ConsultingRepository extends JpaRepository<Consulting, Long> {

    Consulting findConsultingBySessionId(String sessionId);

    @Query("SELECT c FROM Consulting c WHERE c.member.id = :memberId AND c.isExecuted = false")
    List<Consulting> findConsultingsByMember(@Param("memberId") Long memberId);

    Consulting findConsultingById(Long consultingId);

    @Query("SELECT c FROM Consulting  c WHERE c.reservation.id = :reservationId AND c.isExecuted = false")
    Consulting findConsultingByReservationId(@Param("reservationId") Long reservationId);

}
