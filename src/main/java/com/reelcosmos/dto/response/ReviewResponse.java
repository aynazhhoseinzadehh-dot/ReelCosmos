package com.reelcosmos.dto.response;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class ReviewResponse {

    private Long id;

    private String content;

    private UserResponse user;
    private MovieResponse movie;

    private LocalDateTime createdAt;
}