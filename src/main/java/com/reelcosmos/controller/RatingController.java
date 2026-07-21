package com.reelcosmos.controller;

import com.reelcosmos.dto.request.RatingRequest;
import com.reelcosmos.dto.response.RatingResponse;
import com.reelcosmos.service.auth.RatingService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ratings")
@RequiredArgsConstructor
public class RatingController {

    private final RatingService ratingService;

    // =====================================================
    // Create
    // =====================================================

    @PreAuthorize("isAuthenticated()")
    @PostMapping("/movie/{movieId}")
    public ResponseEntity<RatingResponse> createRating(
            @PathVariable Long movieId,
            @Valid @RequestBody RatingRequest request
    ) {

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(
                        ratingService.createRating(movieId, request)
                );

    }

    // =====================================================
    // Read
    // =====================================================

    @GetMapping("/{ratingId}")
    public ResponseEntity<RatingResponse> getRatingById(
            @PathVariable Long ratingId
    ) {

        return ResponseEntity.ok(
                ratingService.getRatingById(ratingId)
        );

    }

    @GetMapping("/movie/{movieId}")
    public ResponseEntity<List<RatingResponse>> getMovieRatings(
            @PathVariable Long movieId
    ) {

        return ResponseEntity.ok(
                ratingService.getRatingsByMovie(movieId)
        );

    }

    @PreAuthorize("isAuthenticated()")
    @GetMapping("/me")
    public ResponseEntity<List<RatingResponse>> getCurrentUserRatings() {

        return ResponseEntity.ok(
                ratingService.getCurrentUserRatings()
        );

    }

    // =====================================================
    // Update
    // =====================================================

    @PreAuthorize("isAuthenticated()")
    @PutMapping("/{ratingId}")
    public ResponseEntity<RatingResponse> updateRating(
            @PathVariable Long ratingId,
            @Valid @RequestBody RatingRequest request
    ) {

        return ResponseEntity.ok(
                ratingService.updateRating(ratingId, request)
        );

    }

    // =====================================================
    // Delete
    // =====================================================

    @PreAuthorize("isAuthenticated()")
    @DeleteMapping("/{ratingId}")
    public ResponseEntity<Void> deleteRating(
            @PathVariable Long ratingId
    ) {

        ratingService.deleteRating(ratingId);

        return ResponseEntity.noContent().build();

    }

}