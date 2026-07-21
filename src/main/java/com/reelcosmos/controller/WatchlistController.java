package com.reelcosmos.controller;

import com.reelcosmos.dto.response.MovieResponse;
import com.reelcosmos.service.auth.WatchlistService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/watchlist")
@RequiredArgsConstructor
@PreAuthorize("isAuthenticated()")
public class WatchlistController {

    private final WatchlistService watchlistService;

    // =====================================================
    // Create
    // =====================================================

    @PostMapping("/{movieId}")
    public ResponseEntity<Void> addToWatchlist(
            @PathVariable Long movieId
    ) {

        watchlistService.addToWatchlist(movieId);

        return ResponseEntity.status(HttpStatus.CREATED).build();

    }

    // =====================================================
    // Read
    // =====================================================

    @GetMapping("/me")
    public ResponseEntity<List<MovieResponse>> getCurrentUserWatchlist() {

        return ResponseEntity.ok(
                watchlistService.getCurrentUserWatchlist()
        );

    }

    // =====================================================
    // Delete
    // =====================================================

    @DeleteMapping("/{movieId}")
    public ResponseEntity<Void> removeFromWatchlist(
            @PathVariable Long movieId
    ) {

        watchlistService.removeFromWatchlist(movieId);

        return ResponseEntity.noContent().build();

    }

}