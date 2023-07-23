package com.refill.security.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        return httpSecurity
            .httpBasic().disable() // UI
            .csrf().disable()
            .cors()
            .and()
            .authorizeHttpRequests()
            .antMatchers("/h2-console/**").permitAll()
            .antMatchers("/api/v1/**/join", "/api/v1/**/login").permitAll()
            .and()
            .sessionManagement()
            .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            .and()
            .headers()
            .frameOptions().disable()
            .and()
            .build();
    }
}
