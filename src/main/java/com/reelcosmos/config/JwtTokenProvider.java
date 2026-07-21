package com.reelcosmos.config;

import com.reelcosmos.entity.User;
import com.reelcosmos.security.SecurityConstants;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Component
@RequiredArgsConstructor
public class JwtTokenProvider {

    @Value("${jwt.secret}")
    private String jwtSecret;

    @Value("${jwt.access-token-expiration}")
    private long accessTokenExpiration;

    @Value("${jwt.refresh-token-expiration}")
    private long refreshTokenExpiration;

    private SecretKey secretKey;

    @PostConstruct
    public void init() {
        secretKey = Keys.hmacShaKeyFor(jwtSecret.getBytes(StandardCharsets.UTF_8));
    }

    public String generateAccessToken(User user) {

        Date now = new Date();

        Date expiry = new Date(now.getTime() + accessTokenExpiration);

        return Jwts.builder()

                .subject(user.getUsername())

                .claim(SecurityConstants.CLAIM_ROLE, user.getRole().name())

                .issuedAt(now)

                .expiration(expiry)

                .signWith(secretKey)

                .compact();

    }

    public String generateRefreshToken(User user) {

        Date now = new Date();

        Date expiry = new Date(now.getTime() + refreshTokenExpiration);

        return Jwts.builder()

                .subject(user.getUsername())

                .issuedAt(now)

                .expiration(expiry)

                .signWith(secretKey)

                .compact();

    }

    public String getUsername(String token) {

        return getClaims(token).getSubject();

    }

    public String getRole(String token) {

        return getClaims(token).get("role", String.class);

    }

    public boolean validateToken(String token) {

        try {

            Jwts.parser()

                    .verifyWith(secretKey)

                    .build()

                    .parseSignedClaims(token);

            return true;

        } catch (JwtException | IllegalArgumentException ex) {

            return false;

        }

    }


    public long getAccessTokenExpiration() {

        return accessTokenExpiration;

    }

    public long getRefreshTokenExpiration() {

        return refreshTokenExpiration;

    }

    private Claims getClaims(String token) {

        return Jwts.parser()

                .verifyWith(secretKey)

                .build()

                .parseSignedClaims(token)

                .getPayload();

    }

}