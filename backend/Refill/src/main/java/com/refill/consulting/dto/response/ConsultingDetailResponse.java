package com.refill.consulting.dto.response;

import com.refill.consulting.entity.Consulting;
import java.time.LocalDate;
import java.time.LocalDateTime;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.validator.constraints.Range;

@Slf4j
public record ConsultingDetailResponse(
    // 진료과, 담당의사, 일자
//    String content,
    String doctorName,
//    LocalDateTime startDateTime,
//
    // member 주소, 이름, 생년월일, 성별?, 나이
    String memberAddress,
    String memberName,
    LocalDate birthDay,
    // 성별, 나이 추가

    // 상담 소견
    String detailConsultingInfo,
//
//    // 병원 이름, 주소, 전화번호
    String hospitalName,
    String hospitalAddress
    // 전화번호
) {
    public ConsultingDetailResponse(Consulting consulting) {
        this (
//            consulting.getDoctor().getMajorAreas().toString(),
            consulting.getDoctor().getName(),
//            consulting.getReservation().getStartDateTime(),
            consulting.getMember().getAddress(),
            consulting.getMember().getName(),
            consulting.getMember().getBirthDay(),
            consulting.getConsultingDetailInfo(),
            consulting.getDoctor().getHospital().getName(),
            consulting.getDoctor().getHospital().getAddress()
        );
    }
}
