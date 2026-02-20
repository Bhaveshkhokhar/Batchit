package com.example.MyChat.service;

import com.example.MyChat.Util.JwtUtil;
import com.example.MyChat.Util.OtpUtil;
import com.example.MyChat.Util.Token;
import com.example.MyChat.io.*;
import com.example.MyChat.model.User;
import com.example.MyChat.repo.jpa.RepoUser;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;


@Service
public class AuthService {
    @Autowired
    RepoUser repoUser;
    @Autowired
    OtpUtil otpUtil;
    @Autowired
    private SmsService smsService;
    @Autowired
    OtpRedisService otpRedisService;
    @Autowired
    JwtUtil jwtUtil;
    @Autowired
    Token tokenobj;
    public ResponseEntity<ApiResponse<RegisterResponse>> register(String phoneNumber) {

        if (repoUser.findByPhoneNumber(phoneNumber) != null) {
            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body(new ApiResponse<>(
                            new RegisterResponse(phoneNumber, "User already registered try another number"),
                            "FAILED"
                    ));
        }
        String otp=otpUtil.generate6DigitOtp();
        smsService.sendOtp("+91" + phoneNumber, otp);
        otpRedisService.saveOtp(phoneNumber, otp);
        System.out.println(otpRedisService.getOtp(phoneNumber));

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(new ApiResponse<>(
                        new RegisterResponse(phoneNumber, "Otp send to your user mobile number valid for 5 min"),
                        "SUCCESS"
                ));
    }

    public ResponseEntity<ApiResponse<AuthenticationResponse>> otpValidation(AutheticationRequest request, HttpServletResponse response) {

        String phoneNumber = request.getPhoneNumber();
        String enteredOtp = request.getOtp();

        // 1️⃣ Get OTP from Redis
        String savedOtp = otpRedisService.getOtp(phoneNumber);

        if (savedOtp == null) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(new ApiResponse<>(
                            new AuthenticationResponse(
                                    "OTP expired or not found"
                            ),
                            "FAILED"
                    ));
        }

        // 2️⃣ Compare OTP
        if (!savedOtp.equals(enteredOtp)) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(new ApiResponse<>(
                            new AuthenticationResponse(
                                    "Invalid OTP"
                            ),
                            "FAILED"
                    ));
        }

        // 3️⃣ OTP valid → delete from Redis
        otpRedisService.deleteOtp(phoneNumber);

        // 4️⃣ Create user if not exists
        User user = repoUser.findByPhoneNumber(phoneNumber);

        if (user == null) {
            user = User.builder()
                    .phoneNumber(phoneNumber)
                    .build();

            repoUser.save(user);
        }

        // 5️⃣ Generate JWT token
        String token = jwtUtil.generateToken(phoneNumber, user.getId());
        tokenobj.setToken(token, response);

        // 6️⃣ Return response
        return ResponseEntity.ok(
                new ApiResponse<>(
                        new AuthenticationResponse(
                                "Authentication successful"
                        ),
                        "SUCCESS"
                )
        );
    }

    public ResponseEntity<ApiResponse<LoginResponse>> login(String phoneNumber){
        if (repoUser.findByPhoneNumber(phoneNumber) == null) {
            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body(new ApiResponse<>(
                            new LoginResponse(phoneNumber, "User does not Exist,Register First"),
                            "FAILED"
                    ));
        }
        String otp=otpUtil.generate6DigitOtp();
        smsService.sendOtp("+91" + phoneNumber, otp);
        otpRedisService.saveOtp(phoneNumber, otp);
        System.out.println(otpRedisService.getOtp(phoneNumber));

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(new ApiResponse<>(
                        new LoginResponse(phoneNumber, "Otp send to your user mobile number valid for 5 min"),
                        "SUCCESS"
                ));
    }
}
