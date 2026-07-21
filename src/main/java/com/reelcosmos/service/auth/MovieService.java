package com.reelcosmos.service.auth;

import com.reelcosmos.dto.request.MovieRequest;
import com.reelcosmos.dto.response.MovieResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface MovieService {

    MovieResponse createMovie(MovieRequest request);

    MovieResponse updateMovie(Long id, MovieRequest request);

    void deleteMovie(Long id);

    MovieResponse getMovieById(Long id);

    MovieResponse getMovieByTmdbId(Long tmdbId);

    Page<MovieResponse> getAllMovies(Pageable pageable);

    List<MovieResponse> searchByTitle(String title);

    List<MovieResponse> getPopularMovies();

    List<MovieResponse> getTopRatedMovies();

}