package com.reelcosmos.service.auth;

import com.reelcosmos.dto.response.MovieResponse;

import java.util.List;

public interface FavoriteService {

    /**
     * Add a movie to current user's favorites.
     */
    void addFavorite(Long movieId);

    /**
     * Remove a movie from current user's favorites.
     */
    void removeFavorite(Long movieId);

    /**
     * Get current user's favorite movies.
     */
    List<MovieResponse> getCurrentUserFavorites();

}