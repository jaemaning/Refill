package com.refill.member.dto.response;

import com.refill.member.entity.Member;
import java.time.LocalDate;

public record MemberInfoResponse(

    String name,
    String address,
    LocalDate birthDay,
    String tel,
    String nickname,
    String email,
    String profileImg
) {

    public MemberInfoResponse(Member member) {
        this (
            member.getName(),
            member.getAddress(),
            member.getBirthDay(),
            member.getTel(),
            member.getNickname(),
            member.getEmail(),
            member.getProfileImg()
        );
    }

}
