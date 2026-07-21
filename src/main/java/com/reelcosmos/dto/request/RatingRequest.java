package com.reelcosmos.dto.request;

import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class RatingRequest {

    @NotNull(message = "Score is required")
    @DecimalMin(value = "1.0")
    @DecimalMax(value = "10.0")
    private Double score;
}
