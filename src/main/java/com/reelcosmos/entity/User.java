package com.reelcosmos.entity;

import com.reelcosmos.entity.Role;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "users")
public class User extends BaseEntity {

    @NotBlank
    @Size(min = 3,max = 50)
    @Column(nullable = false,unique = true,length = 50)
    private String username;

    @NotBlank
    @Email
    @Column(nullable = false,unique = true,length = 100)
    private String email;

    @NotBlank
    @Size(min = 8)
    @Column(nullable = false)
    private String password;

    @Column(length = 50)
    private String firstName;

    @Column(length = 50)
    private String lastName;

    @Column(columnDefinition = "TEXT")
    private String bio;

    private String profileImageUrl;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    @Builder.Default
    private Role role = Role.USER;

    @Column(nullable = false)
    private Boolean enabled = true;

    // ================= Relationships =================

    @Builder.Default
    @OneToMany(mappedBy = "user")
    private List<Rating> ratings = new ArrayList<>();

    @Builder.Default
    @OneToMany(mappedBy = "user")
    private List<Review> reviews = new ArrayList<>();

    @Builder.Default
    @OneToMany(mappedBy = "user")
    private List<Favorite> favorites = new ArrayList<>();

    @Builder.Default
    @OneToMany(mappedBy = "user")
    private List<Watchlist> watchlists = new ArrayList<>();

    @Builder.Default
    @OneToMany(mappedBy = "user")
    private List<WatchedMovie> watchedMovies = new ArrayList<>();

    @Builder.Default
    @OneToMany(mappedBy = "user")
    private List<RefreshToken> refreshTokens = new ArrayList<>();

}