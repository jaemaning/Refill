package com.refill.consulting.dto.response;

public record ConnectionTokenResponse(
    String sessionId,
    String token,
    String shareToken
) { }
