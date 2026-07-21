package com.reelcosmos.controller;

import com.reelcosmos.dto.request.ReviewRequest;
import com.reelcosmos.dto.response.ReviewResponse;
import com.reelcosmos.service.auth.ReviewService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")
@RequiredArgsConstructor
@PreAuthorize("isAuthenticated()")
public class ReviewController {

    private final ReviewService reviewService;

    @PostMapping("/movie/{movieId}")
    public ResponseEntity<ReviewResponse> createReview(
            @PathVariable Long movieId,
            @Valid @RequestBody ReviewRequest request
    ) {

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(
                        reviewService.createReview(movieId, request)
                );

    }

    @GetMapping("/{reviewId}")
    public ResponseEntity<ReviewResponse> getReviewById(
            @PathVariable Long reviewId
    ) {

        return ResponseEntity.ok(
                reviewService.getReviewById(reviewId)
        );

    }

    @GetMapping("/movie/{movieId}")
    public ResponseEntity<List<ReviewResponse>> getMovieReviews(
            @PathVariable Long movieId
    ) {

        return ResponseEntity.ok(
                reviewService.getReviewsByMovie(movieId)
        );

    }

    @GetMapping("/me")
    public ResponseEntity<List<ReviewResponse>> getCurrentUserReviews() {

        return ResponseEntity.ok(
                reviewService.getCurrentUserReviews()
        );

    }

    @PutMapping("/{reviewId}")
    public ResponseEntity<ReviewResponse> updateReview(
            @PathVariable Long reviewId,
            @Valid @RequestBody ReviewRequest request
    ) {

        return ResponseEntity.ok(
                reviewService.updateReview(reviewId, request)
        );

    }

    @DeleteMapping("/{reviewId}")
    public ResponseEntity<Void> deleteReview(
            @PathVariable Long reviewId
    ) {

        reviewService.deleteReview(reviewId);

        return ResponseEntity.noContent().build();

    }

}