package com.reelcosmos.service.auth;

import com.reelcosmos.dto.request.ReviewRequest;
import com.reelcosmos.dto.response.ReviewResponse;

import java.util.List;

public interface ReviewService {

    // =====================================================
    // User
    // =====================================================

    ReviewResponse createReview(
            Long movieId,
            ReviewRequest request
    );

    ReviewResponse updateReview(
            Long reviewId,
            ReviewRequest request
    );

    void deleteReview(
            Long reviewId
    );

    ReviewResponse getReviewById(
            Long reviewId
    );

    List<ReviewResponse> getReviewsByMovie(
            Long movieId
    );

    List<ReviewResponse> getCurrentUserReviews();

    // =====================================================
    // Admin
    // =====================================================

    List<ReviewResponse> getAllReviews();

    void adminDeleteReview(
            Long reviewId
    );

}