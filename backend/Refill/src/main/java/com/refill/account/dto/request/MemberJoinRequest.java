package com.refill.account.dto.request;

public record MemberJoinRequest(

    String loginId,
    String password,
    String nickname,
    String address

) {

}
