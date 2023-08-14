package com.refill.consulting.dto.response;

public record ConnectionTokenResponse(
    Long consultingId,
    String sessionId,
    String token,
    String shareToken,
    String hospitalName
) { }
