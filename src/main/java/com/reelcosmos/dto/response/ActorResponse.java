package com.reelcosmos.dto.response;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;

@Data
@Builder
public class ActorResponse {

    private Long id;

    private Long tmdbId;

    private String name;

    private String biography;

    private LocalDate birthday;

    private String placeOfBirth;

    private String profileImageUrl;
}
