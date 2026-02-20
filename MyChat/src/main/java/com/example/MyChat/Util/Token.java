package com.example.MyChat.Util;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Component;

@Component
public class Token {
    public String getToken(HttpServletRequest request){

        String token=null;
        if (request.getCookies() != null) {
            for (Cookie cookie : request.getCookies()) {
                if ("jwtToken".equals(cookie.getName())) {
                    token = cookie.getValue();
                    break;
                }
            }
        }
        if(token==null){
            String authHeader = request.getHeader("Authorization");
            if (authHeader != null && authHeader.startsWith("Bearer ")) {
                token = authHeader.substring(7);
            }
        }
        return token;
    }
    public void setToken(String token, HttpServletResponse response){
        ResponseCookie cookie = ResponseCookie.from("jwtToken", token)
                .httpOnly(true)
                .secure(true)            // true in production (HTTPS)
                .sameSite("None")          // use "None" + secure=true for cross-domain
                .path("/")
                .maxAge(24 * 60 * 60 * 30)     // 30 day
                .build();

        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());
    }

}
