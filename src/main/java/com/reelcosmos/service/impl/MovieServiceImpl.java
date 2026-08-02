package com.reelcosmos.service.impl;

import com.reelcosmos.dto.request.MovieRequest;
import com.reelcosmos.dto.response.MovieResponse;
import com.reelcosmos.entity.Actor;
import com.reelcosmos.entity.Genre;
import com.reelcosmos.entity.Movie;
import com.reelcosmos.entity.MovieActor;
import com.reelcosmos.exception.DuplicateResourceException;
import com.reelcosmos.exception.ResourceNotFoundException;
import com.reelcosmos.mapper.MovieMapper;
import com.reelcosmos.repository.ActorRepository;
import com.reelcosmos.repository.GenreRepository;
import com.reelcosmos.repository.MovieActorRepository;
import com.reelcosmos.repository.MovieRepository;
import com.reelcosmos.service.auth.MovieService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
@Transactional
public class MovieServiceImpl implements MovieService {


    private final MovieRepository movieRepository;

    private final GenreRepository genreRepository;

    private final ActorRepository actorRepository;

    private final MovieActorRepository movieActorRepository;

    private final MovieMapper movieMapper;



    // =====================================================
    // Helper Methods
    // =====================================================


    private Movie findMovie(Long id) {

        return movieRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Movie not found."
                        )
                );

    }



    private Set<Genre> findGenres(Set<Long> genreIds) {


        if (genreIds == null || genreIds.isEmpty()) {

            return new HashSet<>();

        }


        List<Genre> genres =
                genreRepository.findAllById(genreIds);


        if (genres.size() != genreIds.size()) {

            throw new ResourceNotFoundException(
                    "One or more genres not found."
            );

        }


        return new HashSet<>(genres);

    }



    private List<Actor> findActors(Set<Long> actorIds) {


        if (actorIds == null || actorIds.isEmpty()) {

            return List.of();

        }


        List<Actor> actors =
                actorRepository.findAllById(actorIds);


        if (actors.size() != actorIds.size()) {

            throw new ResourceNotFoundException(
                    "One or more actors not found."
            );

        }


        return actors;

    }
// =====================================================
    // Read Operations
    // =====================================================


    @Override
    @Transactional(readOnly = true)
    public MovieResponse getMovieById(Long id) {

        Movie movie = findMovie(id);

        return movieMapper.toResponse(movie);

    }



    @Override
    @Transactional(readOnly = true)
    public MovieResponse getMovieByTmdbId(Long tmdbId) {


        Movie movie =
                movieRepository.findByTmdbId(tmdbId)

                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Movie not found."
                                )
                        );


        return movieMapper.toResponse(movie);

    }



    @Override
    @Transactional(readOnly = true)
    public Page<MovieResponse> getMovies(
            String title,
            Pageable pageable
    ) {

        Page<Movie> movies;

        if (title == null || title.isBlank()) {

            movies = movieRepository.findAll(pageable);

        } else {

            movies = movieRepository
                    .findByTitleContainingIgnoreCase(
                            title,
                            pageable
                    );

        }

        return movies.map(movieMapper::toResponse);

    }



    @Override
    @Transactional(readOnly = true)
    public List<MovieResponse> searchByTitle(
            String title
    ) {


        return movieRepository
                .findByTitleContainingIgnoreCase(title)

                .stream()

                .map(movieMapper::toResponse)

                .toList();


    }



    // =====================================================
    // CRUD Operations
    // =====================================================



    @Override
    public MovieResponse createMovie(
            MovieRequest request
    ) {


        if (movieRepository.existsByTmdbId(
                request.getTmdbId()
        )) {


            throw new DuplicateResourceException(
                    "Movie already exists."
            );


        }



        Movie movie =
                movieMapper.toEntity(request);



        movie.setGenres(
                findGenres(
                        request.getGenreIds()
                )
        );



        Movie savedMovie =
                movieRepository.save(movie);



        attachActors(
                savedMovie,
                request.getActorIds()
        );



        return movieMapper.toResponse(
                savedMovie
        );


    }
    @Override
    public MovieResponse updateMovie(
            Long id,
            MovieRequest request
    ) {


        Movie movie = findMovie(id);



        if (!movie.getTmdbId()
                .equals(request.getTmdbId())
                &&
                movieRepository.existsByTmdbId(
                        request.getTmdbId()
                )) {


            throw new DuplicateResourceException(
                    "TMDB ID already exists."
            );


        }



        movieMapper.updateEntity(
                request,
                movie
        );



        movie.setGenres(
                findGenres(
                        request.getGenreIds()
                )
        );



        movieActorRepository.deleteAll(
                movieActorRepository.findByMovie(movie)
        );



        attachActors(
                movie,
                request.getActorIds()
        );



        Movie updatedMovie =
                movieRepository.save(movie);



        return movieMapper.toResponse(
                updatedMovie
        );


    }





    @Override
    public void deleteMovie(Long id) {


        Movie movie = findMovie(id);


        movieRepository.delete(movie);


    }





    @Override
    @Transactional(readOnly = true)
    public List<MovieResponse> getPopularMovies() {


        return movieRepository
                .findTop10ByOrderByPopularityDesc()

                .stream()

                .map(movieMapper::toResponse)

                .toList();


    }





    @Override
    @Transactional(readOnly = true)
    public List<MovieResponse> getTopRatedMovies() {


        return movieRepository
                .findTop10ByOrderByAverageRatingDesc()

                .stream()

                .map(movieMapper::toResponse)

                .toList();


    }





    // =====================================================
    // Actor Relationship Helper
    // =====================================================


    private void attachActors(
            Movie movie,
            Set<Long> actorIds
    ) {


        if (actorIds == null ||
                actorIds.isEmpty()) {

            return;

        }



        List<Actor> actors =
                findActors(actorIds);



        int order = 1;



        for (Actor actor : actors) {


            com.reelcosmos.entity.MovieActor movieActor =
                    new com.reelcosmos.entity.MovieActor();



            movieActor.setMovie(movie);

            movieActor.setActor(actor);

            movieActor.setCastOrder(order++);



            movieActorRepository.save(
                    movieActor
            );


        }


    }

}