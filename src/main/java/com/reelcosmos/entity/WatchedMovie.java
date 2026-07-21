package com.reelcosmos.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@SuppressWarnings("Lombok")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(
        name = "watched_movies",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = {"user_id","movie_id"})
        },
        indexes = {
                @Index(name = "idx_watched_user", columnList = "user_id")
        }
)
public class WatchedMovie extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(nullable = false)
    private Movie movie;

    @Column(nullable = false)
    private LocalDateTime watchedAt;

    @Builder.Default
    private Integer rewatchCount = 1;

    private LocalDateTime lastWatched;
}