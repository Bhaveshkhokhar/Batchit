package com.example.MyChat.service;

import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class SmsService {

    @Value("${twilio.from-number}")
    private String fromNumber;

    public void sendOtp(String to, String otp) {
        Message.creator(
                new PhoneNumber(to),
                new PhoneNumber(fromNumber),
                "Your MyChat OTP is: " + otp + " (valid for 5 minutes)"
        ).create();
    }
}
