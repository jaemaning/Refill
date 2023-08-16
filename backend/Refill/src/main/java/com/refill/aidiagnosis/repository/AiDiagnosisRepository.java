package com.refill.aidiagnosis.repository;

import com.refill.aidiagnosis.entity.AiDiagnosis;
import com.refill.member.entity.Member;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AiDiagnosisRepository extends JpaRepository<AiDiagnosis, Long> {

    List<AiDiagnosis> findAllByMember(Member member);

}
