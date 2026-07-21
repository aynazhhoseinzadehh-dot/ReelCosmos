package com.reelcosmos.security;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component
public class AuthenticationFacade {

    public Authentication getAuthentication() {

        return SecurityContextHolder
                .getContext()
                .getAuthentication();

    }

    public UserPrincipal getCurrentUser() {

        Object principal = getAuthentication().getPrincipal();

        if (principal instanceof UserPrincipal userPrincipal) {

            return userPrincipal;

        }

        return null;

    }

}