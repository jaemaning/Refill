package com.refill.aidiagnosis.service;

import static org.assertj.core.api.Assertions.assertThat;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.refill.aidiagnosis.dto.response.AiDiagnosisListResponse;
import com.refill.aidiagnosis.dto.response.AiDiagnosisResponse;
import com.refill.aidiagnosis.dto.response.AiServerResponse;
import com.refill.aidiagnosis.entity.AiDiagnosis;
import com.refill.aidiagnosis.entity.HairLossType;
import com.refill.aidiagnosis.repository.AiDiagnosisRepository;
import com.refill.member.entity.Member;
import com.refill.util.ServiceTest;
import java.util.List;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;


class AiDiagnosisServiceTest extends ServiceTest {

    @Autowired
    AiDiagnosisRepository aiDiagnosisRepository;
    @Autowired
    ObjectMapper objectMapper;

    @BeforeEach
    void tearUp() throws Exception {
        memberInfoGenerator();

        Member member = memberService.findByLoginId("member01");

        for (int i = 0; i < 3; i++) {
            AiDiagnosis aiDiagnosis = AiDiagnosis.builder()
                                                 .member(member)
                                                 .hairLossType(HairLossType.TYPE3)
                                                 .hairLossScore(i + 50)
                                                 .surveyResult("1111100000")
                                                 .certainty("11.1111")
                                                 .build();

            aiDiagnosisRepository.save(aiDiagnosis);
        }
    }

    @Transactional
    @DisplayName("회원별_ai진단_목록_조회된다")
    @Test
    void getAiDiagnosisListByMember() throws Exception {

        Member member = memberService.findByLoginId("member01");

        List<AiDiagnosisListResponse> responseList = aiDiagnosisService.findAllByMember(member.getLoginId());

        assertThat(responseList).satisfies(
            list -> assertThat(list).isNotNull(),
            list -> assertThat(list.size()).isEqualTo(3)
        );
    }

    @Transactional
    @DisplayName("ai진단_단건_조회된다")
    @Test
    void getAiDiagnosisByMember() throws Exception {

        Member member = memberService.findByLoginId("member01");

        AiDiagnosisResponse aiDiagnosis = aiDiagnosisService.findById(1L, member.getLoginId());

        assertThat(aiDiagnosis).satisfies(
            obj -> assertThat(obj).isNotNull(),
            obj -> assertThat(obj.hairLossScore()).isEqualTo(50)
        );
    }

    @Transactional
    @DisplayName("ai진단_수행된다")
    @Test
    void doAiDiagnosisByMember() throws Exception {

        Member member = memberService.findByLoginId("member01");
        AiServerResponse aiServerResponse = new AiServerResponse("type_2", "99.99");

        //TODO : how private method mocking???
    }

}