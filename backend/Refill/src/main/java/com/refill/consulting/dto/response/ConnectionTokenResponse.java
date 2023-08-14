package com.refill.consulting.dto.response;

public record ConnectionTokenResponse(
    Long consultingId,
    Long hospitalId,
    Long doctorId,
    Long memberId,
    String sessionId,
    String token,
    String shareToken,
    String hospitalName
) { }
