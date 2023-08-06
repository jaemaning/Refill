package com.refill.security.config;

import com.refill.security.util.LoginInfo;
import com.refill.global.entity.UserInfo;
import com.refill.global.exception.ErrorCode;
import com.refill.hospital.repository.HospitalRepository;
import com.refill.member.exception.MemberException;
import com.refill.member.repository.MemberRepository;
import com.refill.security.util.JwtProvider;
import java.io.IOException;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

@Slf4j
@RequiredArgsConstructor
@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final MemberRepository memberRepository;
    private final HospitalRepository hospitalRepository;
    private final JwtProvider jwtProvider;

    @Value("${jwt.token.secret}")
    private String secretKey;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException, UsernameNotFoundException {

        final String authorization = request.getHeader(HttpHeaders.AUTHORIZATION);
        log.debug("authorization : '{}'", authorization);

        if (authorization == null || !(authorization.startsWith("Bearer ") || authorization.startsWith("Refresh "))) {
            log.error("authentication is null");
            filterChain.doFilter(request, response);
            return;
        }

        String token = authorization.substring(7); // "Bearer " 또는 "Refresh " 이후의 토큰 부분만 추출

        if (authorization.startsWith("Bearer ")) {
            // Access Token 처리
            if (jwtProvider.isExpired(token, secretKey)) {
                log.error("access token is expired");
                filterChain.doFilter(request, response);
                return;
            }

            String loginId = JwtProvider.getLoginId(token, secretKey);
            UserInfo userDetails = memberRepository.findByLoginId(loginId)
                                                   .map(UserInfo.class::cast)
                                                   .orElseGet(() ->
                                                          hospitalRepository.findByLoginId(loginId)
                                                                            .orElseThrow(() -> new MemberException(ErrorCode.USERNAME_NOT_FOUND))
                                                      );
            // 아이디, 권한만 넣어주기
            LoginInfo loginInfo = new LoginInfo(userDetails.getLoginId(), userDetails.getRole());
            // 권한 부여하기
            UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                loginInfo, null, userDetails.getAuthorities());

            // Detail
            authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
            SecurityContextHolder.getContext()
                                 .setAuthentication(authenticationToken);


        } else if (authorization.startsWith("Refresh ")) {
            // Refresh Token 처리
            String refreshToken = authorization.substring(8); // "Refresh " prefix 제거
            try {
                String newAccessToken = jwtProvider.refreshAccessToken(refreshToken, secretKey);
                response.setHeader(HttpHeaders.AUTHORIZATION, "Bearer " + newAccessToken);
            } catch (Exception e) {
                // Refresh Token 검증 실패 또는 새로운 Access Token 발급 실패
                log.error("Failed to refresh access token", e);
            }

        }

        filterChain.doFilter(request, response);
    }

}