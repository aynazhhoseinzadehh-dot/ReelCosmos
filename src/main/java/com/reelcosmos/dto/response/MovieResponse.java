package com.reelcosmos.dto.response;

import com.reelcosmos.entity.MovieStatus;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;

@Data
@Builder
public class MovieResponse {

    private Long id;

    private Long tmdbId;

    private String title;

    private String originalTitle;

    private String overview;

    private LocalDate releaseDate;

    private Integer runtime;

    private String language;

    private String country;

    private String posterUrl;

    private String backdropUrl;

    private String trailerUrl;

    private Double averageRating;

    private Integer voteCount;

    private Double popularity;

    private MovieStatus status;

    private Set<GenreResponse> genres;
    private List<MovieActorResponse> cast;


}