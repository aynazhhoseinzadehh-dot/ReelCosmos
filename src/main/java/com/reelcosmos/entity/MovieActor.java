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
        name = "movie_actors",
        uniqueConstraints = {
                @UniqueConstraint(
                        columnNames = {
                                "movie_id",
                                "actor_id"
                        }
                )
        }
)
public class MovieActor extends BaseEntity {


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(nullable = false)
    private Movie movie;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(nullable = false)
    private Actor actor;

    @Column(length = 100)
    private String characterName;

    private Integer castOrder;
}