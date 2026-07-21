package com.reelcosmos.service.auth;

import com.reelcosmos.dto.request.RatingRequest;
import com.reelcosmos.dto.response.RatingResponse;

import java.util.List;

public interface RatingService {

    RatingResponse createRating(
            Long movieId,
            RatingRequest request
    );

    RatingResponse updateRating(
            Long ratingId,
            RatingRequest request
    );

    void deleteRating(Long ratingId);

    RatingResponse getRatingById(Long ratingId);

    List<RatingResponse> getRatingsByMovie(Long movieId);

    List<RatingResponse> getCurrentUserRatings();

}