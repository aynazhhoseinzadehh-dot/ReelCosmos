package com.reelcosmos.service.auth;

import com.reelcosmos.dto.request.WatchedMovieRequest;
import com.reelcosmos.dto.response.WatchedMovieResponse;

import java.util.List;

public interface WatchedMovieService {

    /**
     * Mark movie as watched.
     * If movie has already been watched,
     * rewatch count will be increased automatically.
     */
    WatchedMovieResponse markAsWatched(
            Long movieId,
            WatchedMovieRequest request
    );

    /**
     * Delete watched movie record.
     */
    void deleteWatchedMovie(Long watchedMovieId);

    /**
     * Get watched movie by id.
     */
    WatchedMovieResponse getWatchedMovieById(Long watchedMovieId);

    /**
     * Get current user's watched movies.
     */
    List<WatchedMovieResponse> getCurrentUserWatchedMovies();

    /**
     * Get watched records for a movie.
     */
    List<WatchedMovieResponse> getWatchedMoviesByMovie(Long movieId);

}