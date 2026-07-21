package com.reelcosmos.service.auth;

public interface TmdbService {

    /**
     * Sync popular movies from TMDB.
     */
    void syncPopularMovies();

    /**
     * Sync top rated movies from TMDB.
     */
    void syncTopRatedMovies();

    /**
     * Sync upcoming movies from TMDB.
     */
    void syncUpcomingMovies();

    /**
     * Sync now playing movies from TMDB.
     */
    void syncNowPlayingMovies();

    /**
     * Sync all supported movie categories.
     */
    void syncAllMovies();

}