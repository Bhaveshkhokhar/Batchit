package com.example.MyChat.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.concurrent.TimeUnit;

@Service
public class OtpRedisService {

    private static final long OTP_TTL_MINUTES = 5;

    @Autowired
    private RedisTemplate<String, String> redisTemplate;

    public void saveOtp(String phoneNumber, String otp) {
        redisTemplate.opsForValue()
                .set("otp:" + phoneNumber, otp, OTP_TTL_MINUTES, TimeUnit.MINUTES);
    }

    public String getOtp(String phoneNumber) {
        return redisTemplate.opsForValue()
                .get("otp:" + phoneNumber);
    }

    public void deleteOtp(String phoneNumber) {
        redisTemplate.delete("otp:" + phoneNumber);
    }
}

