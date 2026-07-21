package com.reelcosmos.controller;

import com.reelcosmos.dto.request.WatchedMovieRequest;
import com.reelcosmos.dto.response.WatchedMovieResponse;
import com.reelcosmos.service.auth.WatchedMovieService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/watched")
@RequiredArgsConstructor
@PreAuthorize("isAuthenticated()")
public class WatchedMovieController {

    private final WatchedMovieService watchedMovieService;

    // =====================================================
    // Create
    // =====================================================

    @PostMapping("/movie/{movieId}")
    public ResponseEntity<WatchedMovieResponse> markAsWatched(
            @PathVariable Long movieId,
            @Valid @RequestBody WatchedMovieRequest request
    ) {

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(
                        watchedMovieService.markAsWatched(
                                movieId,
                                request
                        )
                );

    }

    // =====================================================
    // Read
    // =====================================================

    @GetMapping("/{watchedMovieId}")
    public ResponseEntity<WatchedMovieResponse> getWatchedMovieById(
            @PathVariable Long watchedMovieId
    ) {

        return ResponseEntity.ok(
                watchedMovieService.getWatchedMovieById(
                        watchedMovieId
                )
        );

    }

    @GetMapping("/me")
    public ResponseEntity<List<WatchedMovieResponse>> getCurrentUserWatchedMovies() {

        return ResponseEntity.ok(
                watchedMovieService.getCurrentUserWatchedMovies()
        );

    }

    @GetMapping("/movie/{movieId}")
    public ResponseEntity<List<WatchedMovieResponse>> getWatchedMoviesByMovie(
            @PathVariable Long movieId
    ) {

        return ResponseEntity.ok(
                watchedMovieService.getWatchedMoviesByMovie(movieId)
        );

    }

    // =====================================================
    // Delete
    // =====================================================

    @DeleteMapping("/{watchedMovieId}")
    public ResponseEntity<Void> deleteWatchedMovie(
            @PathVariable Long watchedMovieId
    ) {

        watchedMovieService.deleteWatchedMovie(
                watchedMovieId
        );

        return ResponseEntity.noContent().build();

    }

}