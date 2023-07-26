package com.refill.security.util;

import com.refill.global.entity.Role;
import com.refill.global.exception.ErrorCode;
import com.refill.security.exception.SecurityException;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.concurrent.TimeUnit;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Component
public class JwtProvider {

    private final RedisTemplate<String, String> redisTemplate;
    private static final Long accessTokenExpireTimeMs = 3600000L; // 1시간
    private static final Long refreshTokenExpireTimeMs = 1209600000L; // 2주일

    public static String getLoginId(String token, String secretKey) {

        return Jwts.parserBuilder()
                   .setSigningKey(secretKey.getBytes(StandardCharsets.UTF_8))
                   .build()
                   .parseClaimsJws(token)
                   .getBody()
                   .get("loginId", String.class);
    }

    public boolean isExpired(String token, String secretKey) {
        return Jwts.parserBuilder()
                   .setSigningKey(secretKey.getBytes(StandardCharsets.UTF_8))
                   .build()
                   .parseClaimsJws(token)
                   .getBody()
                   .getExpiration()
                   .before(new Date());
    }

    public String createToken(String loginId, Role role, String secretKey) {
        Claims claims = Jwts.claims();
        claims.put("loginId", loginId);
        claims.put("role", role);

        Date now = new Date();
        Date accessTokenExpiration = new Date(now.getTime() + accessTokenExpireTimeMs);
        Date refreshTokenExpiration = new Date(now.getTime() + refreshTokenExpireTimeMs);

        String accessToken = Jwts.builder()
                                 .setClaims(claims)
                                 .setIssuedAt(now)
                                 .setExpiration(accessTokenExpiration)
                                 .signWith(
                                     Keys.hmacShaKeyFor(secretKey.getBytes(StandardCharsets.UTF_8)),
                                     SignatureAlgorithm.HS256)
                                 .compact();

        String refreshToken = Jwts.builder()
                                  .setIssuedAt(now)
                                  .setExpiration(refreshTokenExpiration)
                                  .signWith(Keys.hmacShaKeyFor(
                                          secretKey.getBytes(StandardCharsets.UTF_8)),
                                      SignatureAlgorithm.HS256)
                                  .compact();

        // refreshToken을 Redis 또는 데이터베이스에 저장하는 로직 추가
        redisTemplate.opsForValue()
                     .set(loginId, refreshToken, refreshTokenExpireTimeMs, TimeUnit.MILLISECONDS);

        return accessToken;

    }

    public String createRefreshToken(String loginId, String secretKey) {
        Date now = new Date();
        Date refreshTokenExpiration = new Date(now.getTime() + refreshTokenExpireTimeMs);

        String refreshToken = Jwts.builder()
                                  .setSubject(loginId)
                                  .setIssuedAt(now)
                                  .setExpiration(refreshTokenExpiration)
                                  .signWith(Keys.hmacShaKeyFor(
                                          secretKey.getBytes(StandardCharsets.UTF_8)),
                                      SignatureAlgorithm.HS256)
                                  .compact();

        // refreshToken을 Redis 또는 데이터베이스에 저장하는 로직 추가
        redisTemplate.opsForValue()
                     .set(loginId, refreshToken, refreshTokenExpireTimeMs, TimeUnit.MILLISECONDS);

        return refreshToken;
    }

    public String refreshAccessToken(String refreshToken, String secretKey) {
        try {
            Claims claims = Jwts.parserBuilder()
                                .setSigningKey(secretKey.getBytes(StandardCharsets.UTF_8))
                                .build()
                                .parseClaimsJws(refreshToken)
                                .getBody();

            String loginId = claims.getSubject();

            // Redis 또는 데이터베이스에서 저장된 refreshToken과 전달된 refreshToken이 일치하는지 확인
            String storedRefreshToken = redisTemplate.opsForValue()
                                                     .get(loginId);
            if (storedRefreshToken == null || !storedRefreshToken.equals(refreshToken)) {
                throw new SecurityException(ErrorCode.INVALID_REFRESH_TOKEN);
            }

            // 저장된 refreshToken이 유효하면, 새로운 Access Token을 발급
            Date now = new Date();
            Date accessTokenExpiration = new Date(now.getTime() + accessTokenExpireTimeMs);

            Claims newClaims = Jwts.claims();
            newClaims.put("loginId", loginId);

            return Jwts.builder()
                       .setClaims(newClaims)
                       .setIssuedAt(now)
                       .setExpiration(accessTokenExpiration)
                       .signWith(Keys.hmacShaKeyFor(
                               secretKey.getBytes(StandardCharsets.UTF_8)),
                           SignatureAlgorithm.HS256)
                       .compact();

        } catch (Exception e) {
            // Refresh Token 검증 실패
            throw new SecurityException(ErrorCode.INVALID_REFRESH_TOKEN);
        }
    }
}
