package com.reelcosmos.service.auth;

import com.reelcosmos.dto.response.MovieResponse;

import java.util.List;

public interface WatchlistService {

    /**
     * Add movie to current user's watchlist.
     */
    void addToWatchlist(Long movieId);

    /**
     * Remove movie from current user's watchlist.
     */
    void removeFromWatchlist(Long movieId);

    /**
     * Get current user's watchlist.
     */
    List<MovieResponse> getCurrentUserWatchlist();

}