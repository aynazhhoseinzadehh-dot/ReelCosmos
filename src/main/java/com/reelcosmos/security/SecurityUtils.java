package com.reelcosmos.security;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

public final class SecurityUtils {

    private SecurityUtils() {
    }

    public static UserPrincipal getCurrentUser() {

        Authentication authentication =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication();

        if (authentication == null ||
                !authentication.isAuthenticated()) {

            return null;

        }

        Object principal = authentication.getPrincipal();

        if (principal instanceof UserPrincipal userPrincipal) {

            return userPrincipal;

        }

        return null;

    }

    public static Long getCurrentUserId() {

        UserPrincipal user = getCurrentUser();

        return user != null ? user.getId() : null;

    }

    public static String getCurrentUsername() {

        UserPrincipal user = getCurrentUser();

        return user != null ? user.getUsername() : null;

    }

}