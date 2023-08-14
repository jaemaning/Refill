package com.refill.global.config;

import java.time.Duration;
import java.util.HashMap;
import java.util.Map;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.cache.CacheKeyPrefix;
import org.springframework.data.redis.cache.RedisCacheConfiguration;
import org.springframework.data.redis.cache.RedisCacheManager;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.connection.RedisStandaloneConfiguration;
import org.springframework.data.redis.connection.lettuce.LettuceConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.repository.configuration.EnableRedisRepositories;
import org.springframework.data.redis.serializer.GenericJackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.RedisSerializationContext;
import org.springframework.data.redis.serializer.StringRedisSerializer;

@Getter
@RequiredArgsConstructor
@EnableRedisRepositories
@Configuration
public class RedisConfig {

    @Value("${spring.cache.redis.host}")
    private String host;

    @Value("${spring.cache.redis.port}")
    private int port;

    @Value("${spring.cache.redis.password}")
    private String password;

    @Bean
    public RedisConnectionFactory redisConnectionFactory(){
        RedisStandaloneConfiguration standaloneConfiguration = new RedisStandaloneConfiguration(host, port);
        standaloneConfiguration.setPassword(password);
        return new LettuceConnectionFactory(standaloneConfiguration);
    }

    @Bean
    public RedisTemplate<String,String> redisTemplate(){
        RedisTemplate<String, String> redisTemplate = new RedisTemplate<>();
        redisTemplate.setConnectionFactory(redisConnectionFactory());
        redisTemplate.setKeySerializer(new StringRedisSerializer());
        redisTemplate.setValueSerializer(new StringRedisSerializer());
        return redisTemplate;
    }

    @Bean
    public RedisCacheManager cacheManager(RedisConnectionFactory redisConnectionFactory) {
        RedisCacheConfiguration redisCacheConfiguration = RedisCacheConfiguration.defaultCacheConfig()
                                                                                 .disableCachingNullValues()
                                                                                 .entryTtl(Duration.ofMinutes(1L))
                                                                                 .computePrefixWith(CacheKeyPrefix.simple())
                                                                                 .serializeKeysWith(RedisSerializationContext.SerializationPair.fromSerializer(new StringRedisSerializer()))
                                                                                 .serializeValuesWith(RedisSerializationContext.SerializationPair.fromSerializer(new GenericJackson2JsonRedisSerializer()));

        Map<String, RedisCacheConfiguration> redisCacheConfigurationMap = new HashMap<>();
        redisCacheConfigurationMap.put("MemberCacheStore", redisCacheConfiguration);
        redisCacheConfigurationMap.put("HospitalCacheStore", redisCacheConfiguration);

        return RedisCacheManager.RedisCacheManagerBuilder
                                .fromConnectionFactory(redisConnectionFactory)
                                .cacheDefaults(redisCacheConfiguration)
                                .withInitialCacheConfigurations(redisCacheConfigurationMap).build();
    }

}
