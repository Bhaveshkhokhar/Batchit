package com.example.MyChat.controller;

import com.example.MyChat.Util.JwtUtil;
import com.example.MyChat.Util.Token;
import com.example.MyChat.io.*;
import com.example.MyChat.service.AuthService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    AuthService authService;
    @Autowired
    JwtUtil jwtUtil;
    @Autowired
    Token tokenobj;

    @GetMapping("/status")
    public ResponseEntity<ApiResponse<Void>> authStatus(HttpServletRequest request, HttpServletResponse response){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null
                || !authentication.isAuthenticated()
                || authentication instanceof AnonymousAuthenticationToken) {

            ResponseCookie deleteCookie = ResponseCookie.from("jwtToken", "")
                    .httpOnly(true)
                    .secure(false)   // true in production
                    .path("/")
                    .maxAge(0)
                    .build();

            response.addHeader(HttpHeaders.SET_COOKIE, deleteCookie.toString());

            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new ApiResponse<>(null,
                            "User is Unauthorized"
                    ));
        }
        String token= this.tokenobj.getToken(request);
        if(token != null &&jwtUtil.ifNeedRenew(token)){
            String newToken=jwtUtil.renewJwtToken(token);
            tokenobj.setToken(newToken,response);
        }
        return ResponseEntity.ok(
                new ApiResponse<>(null,
                        "User is Authorized"
                )
        );
    }


    @PostMapping("/register")
    public ResponseEntity<ApiResponse<RegisterResponse>> register(
            @Valid @RequestBody RegisterRequest registerRequest) {
        return authService.register(registerRequest.getPhoneNumber());
    }

    @PostMapping("/verify-otp")
    public ResponseEntity<ApiResponse<AuthenticationResponse>> otpValidation(@Valid @RequestBody AutheticationRequest autheticationRequest,HttpServletResponse response){
        return authService.otpValidation(autheticationRequest,response);
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<LoginResponse>> login( @Valid @RequestBody LoginRequest loginRequest){
       return  authService.login(loginRequest.getPhoneNumber());
    }
    @PostMapping("/logout")
    public ResponseEntity<ApiResponse<Void>> logout(HttpServletResponse response){
        ResponseCookie deleteCookie = ResponseCookie.from("jwtToken", "")
                .httpOnly(true)
                .secure(false)   // true in production
                .path("/")
                .maxAge(0)
                .build();
        response.addHeader(HttpHeaders.SET_COOKIE, deleteCookie.toString());
        return ResponseEntity.ok(new ApiResponse<>(null, "Logged out successfully"));
    }

}
