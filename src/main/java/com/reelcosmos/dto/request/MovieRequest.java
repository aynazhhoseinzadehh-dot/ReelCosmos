package com.reelcosmos.dto.request;

import com.reelcosmos.entity.MovieStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.time.LocalDate;
import java.util.Set;

@Data
public class MovieRequest {

    @NotNull(message = "TMDB ID is required")
    private Long tmdbId;

    @NotBlank(message = "Movie title is required")
    @Size(max = 255)
    private String title;

    @Size(max = 255)
    private String originalTitle;

    @Size(max = 5000)
    private String overview;

    private LocalDate releaseDate;

    @Positive(message = "Runtime must be positive")
    private Integer runtime;

    @Size(max = 10)
    private String language;

    @Size(max = 80)
    private String country;

    private String posterUrl;

    private String backdropUrl;

    private String trailerUrl;

    @NotNull(message = "Movie status is required")
    private MovieStatus status;

    /*
        فقط شناسه ژانرها
     */
    private Set<Long> genreIds;

    /*
        فقط شناسه بازیگرها
     */
    private Set<Long> actorIds;
}
