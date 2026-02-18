package com.example.MyChat.io;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class AutheticationRequest {
    @NotBlank(message = "Phone number is required")
    @Pattern(
            regexp = "^[6-9][0-9]{9}$",
            message = "Invalid phone number"
    )
    String phoneNumber;
    @NotBlank(message = "otp number is required")
    @Pattern(
            regexp = "^[0-9]{6}$",
            message = "OTP must be a 6-digit number"
    )
    String otp;
}
