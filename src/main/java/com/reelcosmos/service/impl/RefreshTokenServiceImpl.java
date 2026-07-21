package com.reelcosmos.service.impl;

import com.reelcosmos.entity.RefreshToken;
import com.reelcosmos.entity.User;
import com.reelcosmos.exception.ResourceNotFoundException;
import com.reelcosmos.exception.UnauthorizedException;
import com.reelcosmos.repository.RefreshTokenRepository;
import com.reelcosmos.service.auth.RefreshTokenService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class RefreshTokenServiceImpl implements RefreshTokenService {


    private final RefreshTokenRepository refreshTokenRepository;


    @Value("${jwt.refresh-token-expiration}")
    private long refreshTokenExpiration;



    @Override
    public RefreshToken createRefreshToken(User user) {


        revokeAllUserTokens(user);


        RefreshToken refreshToken = RefreshToken.builder()

                .token(UUID.randomUUID().toString())

                .user(user)

                .expiryDate(
                        LocalDateTime.now()
                                .plusSeconds(refreshTokenExpiration / 1000)
                )

                .revoked(false)

                .build();



        return refreshTokenRepository.save(refreshToken);

    }



    @Override
    public RefreshToken findByToken(String token) {


        return refreshTokenRepository.findByToken(token)

                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Refresh token not found."
                        )
                );

    }




    @Override
    public RefreshToken verifyExpiration(
            RefreshToken token
    ) {


        if (Boolean.TRUE.equals(token.getRevoked())) {


            throw new UnauthorizedException(
                    "Refresh token has been revoked."
            );

        }



        if (token.getExpiryDate()
                .isBefore(LocalDateTime.now())) {



            refreshTokenRepository.delete(token);



            throw new UnauthorizedException(
                    "Refresh token expired."
            );

        }



        return token;

    }





    @Override
    public RefreshToken verifyRefreshToken(String token) {


        RefreshToken refreshToken =
                findByToken(token);


        return verifyExpiration(refreshToken);

    }





    @Override
    public void revokeToken(String token) {


        RefreshToken refreshToken =
                findByToken(token);


        refreshToken.setRevoked(true);


        refreshTokenRepository.save(refreshToken);

    }





    @Override
    public void revokeAllUserTokens(User user) {


        refreshTokenRepository.findByUser(user)

                .forEach(token -> {


                    token.setRevoked(true);


                    refreshTokenRepository.save(token);


                });

    }





    @Override
    public void deleteByUser(User user) {


        refreshTokenRepository.deleteByUser(user);

    }

}