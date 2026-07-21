package com.reelcosmos.scheduler;

import com.reelcosmos.service.auth.TmdbService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class TmdbScheduler {

    private final TmdbService tmdbService;


    // =====================================================
    // Popular Movies
    // Every 12 hours
    // =====================================================

    @Scheduled(
            fixedDelay = 43200000
    )
    public void syncPopularMovies() {

        log.info(
                "Scheduled sync started: popular movies"
        );

        tmdbService.syncPopularMovies();

        log.info(
                "Scheduled sync finished: popular movies"
        );

    }



    // =====================================================
    // Upcoming Movies
    // Every day at 02:00 AM
    // =====================================================

    @Scheduled(
            cron = "0 0 2 * * *"
    )
    public void syncUpcomingMovies() {

        log.info(
                "Scheduled sync started: upcoming movies"
        );

        tmdbService.syncUpcomingMovies();

        log.info(
                "Scheduled sync finished: upcoming movies"
        );

    }



    // =====================================================
    // Now Playing Movies
    // Every day at 03:00 AM
    // =====================================================

    @Scheduled(
            cron = "0 0 3 * * *"
    )
    public void syncNowPlayingMovies() {

        log.info(
                "Scheduled sync started: now playing movies"
        );

        tmdbService.syncNowPlayingMovies();

        log.info(
                "Scheduled sync finished: now playing movies"
        );

    }



    // =====================================================
    // Top Rated Movies
    // Every Sunday at 04:00 AM
    // =====================================================

    @Scheduled(
            cron = "0 0 4 * * SUN"
    )
    public void syncTopRatedMovies() {

        log.info(
                "Scheduled sync started: top rated movies"
        );

        tmdbService.syncTopRatedMovies();

        log.info(
                "Scheduled sync finished: top rated movies"
        );

    }

}