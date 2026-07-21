package com.reelcosmos.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class ReviewRequest {

    @NotBlank(message = "Review content is required")
    @Size(min = 3, max = 3000)
    private String content;
}
