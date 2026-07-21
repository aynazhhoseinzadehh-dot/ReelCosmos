package com.reelcosmos.controller;

import com.reelcosmos.service.auth.TmdbService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/tmdb")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class TmdbController {

    private final TmdbService tmdbService;


    // =====================================================
    // Manual Sync Endpoints
    // =====================================================


    @PostMapping("/sync/popular")
    public ResponseEntity<String> syncPopularMovies() {

        tmdbService.syncPopularMovies();

        return ResponseEntity.ok(
                "Popular movies synchronized successfully."
        );

    }



    @PostMapping("/sync/top-rated")
    public ResponseEntity<String> syncTopRatedMovies() {

        tmdbService.syncTopRatedMovies();

        return ResponseEntity.ok(
                "Top rated movies synchronized successfully."
        );

    }



    @PostMapping("/sync/upcoming")
    public ResponseEntity<String> syncUpcomingMovies() {

        tmdbService.syncUpcomingMovies();

        return ResponseEntity.ok(
                "Upcoming movies synchronized successfully."
        );

    }



    @PostMapping("/sync/now-playing")
    public ResponseEntity<String> syncNowPlayingMovies() {

        tmdbService.syncNowPlayingMovies();

        return ResponseEntity.ok(
                "Now playing movies synchronized successfully."
        );

    }



    @PostMapping("/sync/all")
    public ResponseEntity<String> syncAllMovies() {

        tmdbService.syncAllMovies();

        return ResponseEntity.ok(
                "Full TMDB synchronization completed successfully."
        );

    }

}