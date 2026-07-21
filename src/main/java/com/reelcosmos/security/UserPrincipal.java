package com.reelcosmos.security;

import com.reelcosmos.entity.User;
import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Getter
public class UserPrincipal implements UserDetails {

    private final Long id;

    private final String username;

    private final String email;

    private final String password;

    private final Boolean enabled;

    private final Collection<? extends GrantedAuthority> authorities;

    private UserPrincipal(
            Long id,
            String username,
            String email,
            String password,
            Boolean enabled,
            Collection<? extends GrantedAuthority> authorities
    ) {

        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.enabled = enabled;
        this.authorities = authorities;

    }

    public static UserPrincipal create(User user) {

        return new UserPrincipal(

                user.getId(),

                user.getUsername(),

                user.getEmail(),

                user.getPassword(),

                user.getEnabled(),

                List.of(
                        new SimpleGrantedAuthority(
                                "ROLE_" + user.getRole().name()
                        )
                )
        );

    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return enabled;
    }

}