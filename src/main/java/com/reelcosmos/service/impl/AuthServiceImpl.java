package com.reelcosmos.service.impl;

import com.reelcosmos.config.JwtTokenProvider;
import com.reelcosmos.dto.auth.LoginRequest;
import com.reelcosmos.dto.auth.RefreshTokenRequest;
import com.reelcosmos.dto.auth.RegisterRequest;
import com.reelcosmos.dto.response.JwtResponse;
import com.reelcosmos.entity.RefreshToken;
import com.reelcosmos.entity.Role;
import com.reelcosmos.entity.User;
import com.reelcosmos.exception.DuplicateResourceException;
import com.reelcosmos.exception.UnauthorizedException;
import com.reelcosmos.repository.UserRepository;
import com.reelcosmos.security.SecurityUtils;
import com.reelcosmos.service.auth.AuthService;
import com.reelcosmos.service.auth.AuthService;
import com.reelcosmos.service.auth.RefreshTokenService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {


    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    private final AuthenticationManager authenticationManager;

    private final JwtTokenProvider jwtTokenProvider;

    private final RefreshTokenService refreshTokenService;



    @Value("${jwt.access-token-expiration}")
    private Long accessTokenExpiration;




    @Override
    public JwtResponse register(RegisterRequest request) {


        if (userRepository.existsByUsername(request.getUsername())) {

            throw new DuplicateResourceException(
                    "Username already exists."
            );

        }



        if (userRepository.existsByEmail(request.getEmail())) {

            throw new DuplicateResourceException(
                    "Email already exists."
            );

        }




        User user = User.builder()

                .username(request.getUsername())

                .email(request.getEmail())

                .password(
                        passwordEncoder.encode(
                                request.getPassword()
                        )
                )

                .firstName(request.getFirstName())

                .lastName(request.getLastName())

                .role(Role.USER)

                .enabled(true)

                .build();



        userRepository.save(user);



        String accessToken =
                jwtTokenProvider.generateAccessToken(user);



        RefreshToken refreshToken =
                refreshTokenService.createRefreshToken(user);




        return buildJwtResponse(
                accessToken,
                refreshToken.getToken()
        );

    }





    @Override
    public JwtResponse login(LoginRequest request) {


        try {


            Authentication authentication =
                    authenticationManager.authenticate(

                            new UsernamePasswordAuthenticationToken(

                                    request.getUsernameOrEmail(),

                                    request.getPassword()

                            )

                    );



        } catch (BadCredentialsException ex) {


            throw new UnauthorizedException(
                    "Invalid username/email or password."
            );

        }




        User user =
                userRepository.findByUsernameOrEmail(

                                request.getUsernameOrEmail(),

                                request.getUsernameOrEmail()

                        )

                        .orElseThrow(() ->
                                new UnauthorizedException(
                                        "User not found."
                                )
                        );





        String accessToken =
                jwtTokenProvider.generateAccessToken(user);

        RefreshToken refreshToken =
                refreshTokenService.createRefreshToken(user);




        return buildJwtResponse(
                accessToken,
                refreshToken.getToken()
        );

    }







    @Override
    public JwtResponse refreshToken(
            RefreshTokenRequest request
    ) {


        RefreshToken refreshToken =
                refreshTokenService.verifyRefreshToken(
                        request.getRefreshToken()
                );



        User user =
                refreshToken.getUser();




        String accessToken =
                jwtTokenProvider.generateAccessToken(user);




        return buildJwtResponse(
                accessToken,
                refreshToken.getToken()
        );

    }







    @Override
    public void logout() {


        Long userId =
                SecurityUtils.getCurrentUserId();



        if (userId == null) {


            throw new UnauthorizedException(
                    "User is not authenticated."
            );

        }





        User user =
                userRepository.findById(userId)

                        .orElseThrow(() ->
                                new UnauthorizedException(
                                        "User not found."
                                )
                        );




        refreshTokenService.deleteByUser(user);

    }








    private JwtResponse buildJwtResponse(
            String accessToken,
            String refreshToken
    ) {


        return JwtResponse.builder()

                .accessToken(accessToken)

                .refreshToken(refreshToken)

                .expiresIn(
                        accessTokenExpiration / 1000
                )

                .build();

    }

}