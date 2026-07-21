package com.reelcosmos.entity;

import jakarta.persistence.*;
import lombok.*;

@SuppressWarnings("Lombok")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(
        name = "favorites",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = {"user_id","movie_id"})
        },
        indexes = {
                @Index(name = "idx_favorite_user", columnList = "user_id")
        }
)
public class Favorite extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(nullable = false)
    private Movie movie;
}