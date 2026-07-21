package com.reelcosmos.dto.response;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class WatchedMovieResponse {

    private Long id;

    private MovieResponse movie;

    private LocalDateTime watchedAt;

    private Integer rewatchCount;

    private LocalDateTime lastWatched;
}