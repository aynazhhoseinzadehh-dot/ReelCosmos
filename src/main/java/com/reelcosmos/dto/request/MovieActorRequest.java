package com.reelcosmos.dto.request;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class MovieActorRequest {

    @NotNull(message = "Actor id is required")
    private Long actorId;

    @Size(max = 100, message = "Character name must not exceed 100 characters")
    private String characterName;

    @PositiveOrZero(message = "Cast order cannot be negative")
    private Integer castOrder;

}