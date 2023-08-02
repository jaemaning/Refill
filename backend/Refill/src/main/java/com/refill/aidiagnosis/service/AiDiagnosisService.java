package com.refill.aidiagnosis.service;

import com.refill.aidiagnosis.dto.response.AiDiagnosisResponse;
import com.refill.aidiagnosis.repository.AiDiagnosisRepository;
import com.refill.member.entity.Member;
import com.refill.member.service.MemberService;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@RequiredArgsConstructor
@Service
public class AiDiagnosisService {

    private final AiDiagnosisRepository aiDiagnosisRepository;
    private final MemberService memberService;

    public List<AiDiagnosisResponse> findAllByMember(String loginId) {

        Member member = memberService.findByLoginId(loginId);

        return aiDiagnosisRepository.findAllByMember(member)
                                    .stream()
                                    .map(AiDiagnosisResponse::new)
                                    .collect(Collectors.toList());
    }
}
