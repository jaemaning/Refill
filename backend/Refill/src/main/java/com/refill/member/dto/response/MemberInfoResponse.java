package com.refill.member.dto.response;

import com.refill.aidiagnosis.dto.response.AiDiagnosisListResponse;
import com.refill.consulting.dto.response.ConsultingListResponse;
import com.refill.member.entity.Member;
import com.refill.reservation.dto.response.ReservationListResponse;
import java.time.LocalDate;
import java.util.List;

public record MemberInfoResponse(

    String name,
    String address,
    LocalDate birthDay,
    String tel,
    String nickname,
    String email,
    String profileImg,

    List<AiDiagnosisListResponse> aiDiagnosisList,
    List<ReservationListResponse> reservationList,
    List<ConsultingListResponse> consultingList

) {

    public MemberInfoResponse(Member member) {
        this (
            member.getName(),
            member.getAddress(),
            member.getBirthDay(),
            member.getTel(),
            member.getNickname(),
            member.getEmail(),
            member.getProfileImg(),
            null,
            null,
            null
        );
    }

    public MemberInfoResponse(Member member, List<AiDiagnosisListResponse> aiDiagnosisList, List<ReservationListResponse> reservationList, List<ConsultingListResponse> consultingList) {
        this (
            member.getName(),
            member.getAddress(),
            member.getBirthDay(),
            member.getTel(),
            member.getNickname(),
            member.getEmail(),
            member.getProfileImg(),
            aiDiagnosisList,
            reservationList,
            consultingList
        );
    }

}
