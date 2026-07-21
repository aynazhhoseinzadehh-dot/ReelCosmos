package com.reelcosmos.service.auth;

import com.reelcosmos.entity.RefreshToken;
import com.reelcosmos.entity.User;

public interface RefreshTokenService {

    RefreshToken createRefreshToken(User user);

    RefreshToken findByToken(String token);

    RefreshToken verifyExpiration(RefreshToken token);

    RefreshToken verifyRefreshToken(String token);

    void revokeToken(String token);

    void revokeAllUserTokens(User user);

    void deleteByUser(User user);
}