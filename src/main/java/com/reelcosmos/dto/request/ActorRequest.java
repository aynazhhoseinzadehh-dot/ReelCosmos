package com.reelcosmos.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.time.LocalDate;

@Data
public class ActorRequest {

    @NotNull(message = "TMDB ID is required")
    private Long tmdbId;

    @NotBlank(message = "Actor name is required")
    @Size(max = 150)
    private String name;

    @Size(max = 5000)
    private String biography;

    private LocalDate birthday;

    @Size(max = 150)
    private String placeOfBirth;

    private String profileImageUrl;
}