package com.example.MyChat.Util;

import com.example.MyChat.repo.RepoUser;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.function.Function;

@Component
public class JwtUtil {
    @Value("${SECRET}")
    private  String SECRET ;
    private final long EXPIRATION_MS = 60 * 60 * 1000L * 24 * 30; // 30 days
    private final RepoUser repoUser;

    public JwtUtil(RepoUser repoUser) {
        this.repoUser = repoUser;
    }
    public String generateToken(String phoneNumber,String userId) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("userId", userId);

        return Jwts.builder()
                .setClaims(claims)
                .setSubject(phoneNumber)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_MS))
                .signWith(getKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    public String extractPhone(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getKey())
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }
    public String extractUserid(String token) {
        return extractClaim(token, claims -> claims.get("userId", String.class));
    }

    public boolean validate(String token) {
        try {
            final String phoneNumber=extractPhone(token);
            boolean userExists = repoUser.findByPhoneNumber(phoneNumber) != null;
            return (userExists &&!isTokenExpired(token));
        } catch (Exception e) {
            return false;
        }
    }
    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }
    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }
    private <T> T extractClaim(String token, Function<Claims, T> claimResolver) {
        final Claims claims = extractAllClaims(token);
        return claimResolver.apply(claims);
    }
    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
    private Key getKey(){
        byte[] keyBytes= Decoders.BASE64.decode(SECRET);
        return Keys.hmacShaKeyFor(keyBytes);
    }
    public String renewJwtToken(String token){
        String phoneNumber = extractPhone(token);
        String userId = extractUserid(token);
        return generateToken(phoneNumber, userId);
    }

    public boolean ifNeedRenew(String token) {
        try {
            Date expiration = extractExpiration(token);

            long remainingTime = expiration.getTime() - System.currentTimeMillis();

            long oneDayInMillis = 1000L * 60 * 60 * 24; // 1 day

            return remainingTime <= oneDayInMillis;
        } catch (Exception e) {
            // invalid token → treat as non-renewable
            return false;
        }
    }

}

