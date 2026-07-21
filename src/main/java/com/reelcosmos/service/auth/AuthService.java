package com.reelcosmos.service.auth;

import com.reelcosmos.dto.auth.LoginRequest;
import com.reelcosmos.dto.auth.RefreshTokenRequest;
import com.reelcosmos.dto.auth.RegisterRequest;
import com.reelcosmos.dto.response.JwtResponse;

public interface AuthService {

    JwtResponse register(RegisterRequest request);

    JwtResponse login(LoginRequest request);

    JwtResponse refreshToken(RefreshTokenRequest request);

    void logout();
}