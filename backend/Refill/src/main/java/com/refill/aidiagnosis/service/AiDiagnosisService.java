package com.refill.aidiagnosis.service;

import com.refill.aidiagnosis.dto.response.AiDiagnosisResponse;
import com.refill.aidiagnosis.entity.AiDiagnosis;
import com.refill.aidiagnosis.repository.AiDiagnosisRepository;
import com.refill.global.exception.ErrorCode;
import com.refill.member.entity.Member;
import com.refill.member.exception.MemberException;
import com.refill.member.service.MemberService;
import java.util.List;
import java.util.stream.Collectors;
import javax.persistence.EntityNotFoundException;
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

    public AiDiagnosisResponse findById(Long id, String loginId) {

        AiDiagnosis aiDiagnosis = aiDiagnosisRepository.findById(id).orElseThrow(EntityNotFoundException::new);

        if(!aiDiagnosis.getMember().getLoginId().equals(loginId)) {
            throw new MemberException(ErrorCode.UNAUTHORIZED_REQUEST);
        }

        return new AiDiagnosisResponse(aiDiagnosis);
    }
}
