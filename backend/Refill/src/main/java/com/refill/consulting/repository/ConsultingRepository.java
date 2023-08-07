package com.refill.consulting.repository;

import com.refill.consulting.entity.Consulting;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ConsultingRepository extends JpaRepository<Consulting, Long> {
    Consulting findConsultingBySessionId(String sessionId);
}
