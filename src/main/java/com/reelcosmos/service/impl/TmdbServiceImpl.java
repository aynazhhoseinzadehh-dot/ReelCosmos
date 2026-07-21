package com.reelcosmos.service.impl;

import com.reelcosmos.client.TmdbClient;
import com.reelcosmos.config.TmdbProperties;
import com.reelcosmos.entity.Actor;
import com.reelcosmos.entity.Genre;
import com.reelcosmos.entity.Movie;
import com.reelcosmos.entity.MovieActor;
import com.reelcosmos.repository.ActorRepository;
import com.reelcosmos.repository.GenreRepository;
import com.reelcosmos.repository.MovieActorRepository;
import com.reelcosmos.repository.MovieRepository;
import com.reelcosmos.service.auth.TmdbService;
import com.reelcosmos.util.TmdbImageUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional
public class TmdbServiceImpl implements TmdbService {

    private final TmdbClient tmdbClient;

    private final TmdbProperties tmdbProperties;

    private final TmdbImageUtil tmdbImageUtil;

    private final MovieRepository movieRepository;

    private final GenreRepository genreRepository;

    private final ActorRepository actorRepository;

    private final MovieActorRepository movieActorRepository;


    // =====================================================
    // Public API
    // =====================================================

    @Override
    public void syncPopularMovies() {

        log.info("Starting popular movies synchronization");

        syncMoviePage(
                tmdbClient.getPopularMovies(
                        tmdbProperties.getApiKey(),
                        1
                )
        );

        log.info("Popular movies synchronization completed");

    }


    @Override
    public void syncTopRatedMovies() {

        log.info("Starting top rated movies synchronization");

        syncMoviePage(
                tmdbClient.getTopRatedMovies(
                        tmdbProperties.getApiKey(),
                        1
                )
        );

        log.info("Top rated movies synchronization completed");

    }


    @Override
    public void syncUpcomingMovies() {

        log.info("Starting upcoming movies synchronization");

        syncMoviePage(
                tmdbClient.getUpcomingMovies(
                        tmdbProperties.getApiKey(),
                        1
                )
        );

        log.info("Upcoming movies synchronization completed");

    }


    @Override
    public void syncNowPlayingMovies() {

        log.info("Starting now playing movies synchronization");

        syncMoviePage(
                tmdbClient.getNowPlayingMovies(
                        tmdbProperties.getApiKey(),
                        1
                )
        );

        log.info("Now playing movies synchronization completed");

    }


    @Override
    public void syncAllMovies() {

        log.info("Starting full TMDB synchronization");

        syncPopularMovies();

        syncTopRatedMovies();

        syncUpcomingMovies();

        syncNowPlayingMovies();

        log.info("Full TMDB synchronization completed");

    }
    // =====================================================
    // Movie Page Sync
    // =====================================================

    @SuppressWarnings("unchecked")
    private void syncMoviePage(
            Map<String, Object> response
    ) {

        if (response == null) {

            log.warn("TMDB response is null");

            return;

        }

        List<Map<String, Object>> results =
                (List<Map<String, Object>>) response.get("results");


        if (results == null || results.isEmpty()) {

            log.warn("No movies found in TMDB response");

            return;

        }


        log.info(
                "{} movies received from TMDB",
                results.size()
        );


        for (Map<String, Object> movieData : results) {

            try {

                saveOrUpdateMovie(movieData);

            } catch (Exception exception) {

                log.error(
                        "Failed syncing movie with tmdb id: {}",
                        movieData.get("id"),
                        exception
                );

            }

        }

    }


    // =====================================================
    // Movie Save / Update
    // =====================================================

    private void saveOrUpdateMovie(
            Map<String, Object> movieData
    ) {


        Long tmdbId =
                ((Number) movieData.get("id"))
                        .longValue();


        Movie movie =
                movieRepository
                        .findByTmdbId(tmdbId)
                        .orElseGet(Movie::new);


        movie.setTmdbId(tmdbId);


        movie.setTitle(
                (String) movieData.get("title")
        );


        movie.setOriginalTitle(
                (String) movieData.get("original_title")
        );


        movie.setOverview(
                (String) movieData.get("overview")
        );


        movie.setLanguage(
                (String) movieData.get("original_language")
        );


        movie.setPosterUrl(
                tmdbImageUtil.poster(
                        (String) movieData.get("poster_path")
                )
        );


        movie.setBackdropUrl(
                tmdbImageUtil.backdrop(
                        (String) movieData.get("backdrop_path")
                )
        );


        if (movieData.get("popularity") != null) {

            movie.setPopularity(
                    ((Number) movieData.get("popularity"))
                            .doubleValue()
            );

        }


        if (movieData.get("vote_average") != null) {

            movie.setAverageRating(
                    ((Number) movieData.get("vote_average"))
                            .doubleValue()
            );

        }


        if (movieData.get("vote_count") != null) {

            movie.setVoteCount(
                    ((Number) movieData.get("vote_count"))
                            .intValue()
            );

        }


        String releaseDate =
                (String) movieData.get("release_date");


        if (releaseDate != null
                && !releaseDate.isBlank()) {

            movie.setReleaseDate(
                    LocalDate.parse(releaseDate)
            );

        }


        Movie savedMovie =
                movieRepository.save(movie);


        // دریافت جزئیات کامل فیلم

        Map<String, Object> details =
                tmdbClient.getMovieDetails(
                        tmdbId,
                        tmdbProperties.getApiKey()
                );


        if (details != null) {


            @SuppressWarnings("unchecked")
            List<Map<String, Object>> genres =
                    (List<Map<String, Object>>)
                            details.get("genres");


            syncGenres(
                    savedMovie,
                    genres
            );

        }


        // دریافت بازیگران

        Map<String, Object> credits =
                tmdbClient.getMovieCredits(
                        tmdbId, tmdbProperties.getApiKey()
                );


        if (credits != null) {


            @SuppressWarnings("unchecked")
            List<Map<String, Object>> cast =
                    (List<Map<String, Object>>)
                            credits.get("cast");


            syncCast(
                    savedMovie,
                    cast
            );

        }


        movieRepository.save(savedMovie);

    }
    // =====================================================
    // Genre Sync
    // =====================================================

    private void syncGenres(
            Movie movie,
            List<Map<String, Object>> genres
    ) {

        if (genres == null || genres.isEmpty()) {

            return;

        }


        movie.getGenres().clear();


        for (Map<String, Object> genreData : genres) {


            String name =
                    (String) genreData.get("name");


            if (name == null || name.isBlank()) {

                continue;

            }


            Genre genre =
                    genreRepository
                            .findByName(name)
                            .orElseGet(() -> {


                                Genre newGenre =
                                        Genre.builder()
                                                .name(name)
                                                .build();


                                return genreRepository.save(newGenre);

                            });


            movie.getGenres().add(genre);

        }

    }


    // =====================================================
    // Cast Sync
    // =====================================================

    private void syncCast(
            Movie movie,
            List<Map<String, Object>> cast
    ) {


        if (cast == null || cast.isEmpty()) {

            return;

        }


        // حذف روابط قبلی
        movie.getCast().clear();


        for (Map<String, Object> actorData : cast) {


            Long tmdbActorId =
                    ((Number) actorData.get("id"))
                            .longValue();


            Actor actor =
                    actorRepository
                            .findByTmdbId(tmdbActorId)
                            .orElseGet(() -> {


                                Actor newActor =
                                        Actor.builder()
                                                .tmdbId(tmdbActorId)
                                                .name(
                                                        (String)
                                                                actorData.get("name")
                                                )
                                                .profileImageUrl(
                                                        tmdbImageUtil.profile(
                                                                (String)
                                                                        actorData.get("profile_path")
                                                        )
                                                )
                                                .build();


                                return actorRepository.save(newActor);

                            });


            MovieActor movieActor =
                    new MovieActor();


            movieActor.setMovie(movie);


            movieActor.setActor(actor);


            movieActor.setCharacterName(
                    (String)
                            actorData.get("character")
            );


            if (actorData.get("order") != null) {


                movieActor.setCastOrder(
                        ((Number)
                                actorData.get("order"))
                                .intValue()
                );


            } else {


                movieActor.setCastOrder(0);


            }


            movie.getCast().add(movieActor);


        }

    }
}