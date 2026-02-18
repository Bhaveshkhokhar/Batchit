package com.example.MyChat.Util;

import org.springframework.stereotype.Component;

import java.security.SecureRandom;
@Component
public class OtpUtil {

    private static final SecureRandom random = new SecureRandom();

    public static String generate6DigitOtp() {
        int otp = 100000 + random.nextInt(900000); // 100000–999999
        return String.valueOf(otp);
    }
}
