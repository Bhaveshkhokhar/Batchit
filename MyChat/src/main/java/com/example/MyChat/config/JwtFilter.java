package com.example.MyChat.config;

import com.example.MyChat.Util.JwtUtil;
import com.example.MyChat.Util.Token;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

@Component
public class JwtFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    Token tokenobj;

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain)
            throws ServletException, IOException {
        String token= this.tokenobj.getToken(request);
            if (token!=null&&jwtUtil.validate(token)) {
                String phone = jwtUtil.extractPhone(token);

                UsernamePasswordAuthenticationToken auth =
                        new UsernamePasswordAuthenticationToken(
                                phone, null, List.of()
                        );

                SecurityContextHolder.getContext().setAuthentication(auth);
            }


        filterChain.doFilter(request, response);
    }
}
