package com.reelcosmos.config;

import com.reelcosmos.repository.MovieRepository;
import com.reelcosmos.service.auth.TmdbService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

//@Configuration
@RequiredArgsConstructor
@Slf4j
public class TmdbInitializer {

    private final TmdbService tmdbService;
    private final MovieRepository movieRepository;

    @Bean
    CommandLineRunner loadTmdbMovies() {

        return args -> {

            long count = movieRepository.count();

            if (count > 0) {

                log.info("Movies already exist in database ({} movies).", count);
                log.info("Skipping TMDB synchronization.");

                return;
            }

            log.info("Database is empty.");
            log.info("Starting first TMDB synchronization...");

            tmdbService.syncAllMovies();

            log.info("Initial synchronization completed.");
        };
    }
}