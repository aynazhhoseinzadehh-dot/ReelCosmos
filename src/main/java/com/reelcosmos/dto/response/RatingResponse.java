package com.reelcosmos.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class RatingResponse {

    private Long id;

    private Double score;

    private UserResponse user;
    private MovieResponse movie;
}