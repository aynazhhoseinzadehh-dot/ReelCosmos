package com.reelcosmos.config;

import com.reelcosmos.entity.User;
import com.reelcosmos.exception.ResourceNotFoundException;
import com.reelcosmos.repository.UserRepository;
import com.reelcosmos.security.UserPrincipal;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String usernameOrEmail) {

        User user = userRepository

                .findByUsernameOrEmail(usernameOrEmail, usernameOrEmail)

                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found.")
                );

        return UserPrincipal.create(user);

    }

}