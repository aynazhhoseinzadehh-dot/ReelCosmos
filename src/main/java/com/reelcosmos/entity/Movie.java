package com.reelcosmos.entity;

import com.reelcosmos.entity.MovieStatus;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.*;


@SuppressWarnings("Lombok")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(
        name = "movies",
        indexes = {
                @Index(name = "idx_movie_title", columnList = "title"),
                @Index(name = "idx_movie_release", columnList = "releaseDate"),
                @Index(name = "idx_movie_rating", columnList = "averageRating"),
                @Index(name = "idx_movie_popularity", columnList = "popularity")
        }
)
public class Movie extends BaseEntity {

    @Column(nullable = false, unique = true)
    private Long tmdbId;

    @Column(nullable = false)
    private String title;

    private String originalTitle;

    @Column(columnDefinition = "TEXT")
    private String overview;

    private LocalDate releaseDate;

    private Integer runtime;

    @Column(length = 10)
    private String language;

    @Column(length = 80)
    private String country;

    private String posterUrl;

    private String backdropUrl;

    private String trailerUrl;

    @Builder.Default
    private Double averageRating = 0.0;

    @Builder.Default
    private Integer voteCount = 0;

    @Builder.Default
    private Double popularity = 0.0;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    @Builder.Default
    private MovieStatus status = MovieStatus.RELEASED;

    // ================= Genres =================


    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "movie_genres",
            joinColumns = @JoinColumn(name = "movie_id"),
            inverseJoinColumns = @JoinColumn(name = "genre_id")
    )
    private Set<Genre> genres = new HashSet<>();

    // ================= Cast =================


    @OneToMany(
            mappedBy = "movie",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<MovieActor> cast = new ArrayList<>();

    // ================= Ratings =================


    @OneToMany(
            mappedBy = "movie",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<Rating> ratings = new ArrayList<>();

    // ================= Reviews =================


    @OneToMany(
            mappedBy = "movie",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<Review> reviews = new ArrayList<>();

    // ================= Favorites =================


    @OneToMany(
            mappedBy = "movie",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<Favorite> favorites = new ArrayList<>();

    // ================= Watchlist =================


    @OneToMany(
            mappedBy = "movie",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<Watchlist> watchlists = new ArrayList<>();

    // ================= Watched =================


    @OneToMany(
            mappedBy = "movie",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<WatchedMovie> watchedMovies = new ArrayList<>();
}