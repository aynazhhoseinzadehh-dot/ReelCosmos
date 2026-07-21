package com.reelcosmos.controller;

import com.reelcosmos.dto.response.MovieResponse;
import com.reelcosmos.service.auth.FavoriteService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/favorites")
@RequiredArgsConstructor
@PreAuthorize("isAuthenticated()")
public class FavoriteController {

    private final FavoriteService favoriteService;

    // =====================================================
    // Create
    // =====================================================

    @PostMapping("/{movieId}")
    public ResponseEntity<Void> addFavorite(
            @PathVariable Long movieId
    ) {

        favoriteService.addFavorite(movieId);

        return ResponseEntity.status(HttpStatus.CREATED).build();

    }

    // =====================================================
    // Read
    // =====================================================

    @GetMapping("/me")
    public ResponseEntity<List<MovieResponse>> getCurrentUserFavorites() {

        return ResponseEntity.ok(
                favoriteService.getCurrentUserFavorites()
        );

    }

    // =====================================================
    // Delete
    // =====================================================

    @DeleteMapping("/{movieId}")
    public ResponseEntity<Void> removeFavorite(
            @PathVariable Long movieId
    ) {

        favoriteService.removeFavorite(movieId);

        return ResponseEntity.noContent().build();

    }

}