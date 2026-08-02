package com.reelcosmos.controller;

import com.reelcosmos.dto.request.MovieRequest;
import com.reelcosmos.dto.response.MovieResponse;
import com.reelcosmos.service.auth.MovieService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/movies")
@RequiredArgsConstructor
public class MovieController {

    private final MovieService movieService;

    @GetMapping
    public ResponseEntity<Page<MovieResponse>> getMovies(

            @RequestParam(required = false) String title,

            @RequestParam(defaultValue = "0") int page,

            @RequestParam(defaultValue = "20") int size,

            @RequestParam(defaultValue = "popularity,desc") String sort

    ) {

        size = Math.min(size, 100);

        String[] sortParts = sort.split(",");

        String property = sortParts[0];

        Sort.Direction direction =
                sortParts.length > 1
                        ? Sort.Direction.fromString(sortParts[1])
                        : Sort.Direction.DESC;

        Pageable pageable =
                PageRequest.of(
                        page,
                        size,
                        Sort.by(direction, property)
                );

        return ResponseEntity.ok(
                movieService.getMovies(title, pageable)
        );

    }

    @GetMapping("/{id}")
    public ResponseEntity<MovieResponse> getMovieById(
            @PathVariable Long id
    ) {

        return ResponseEntity.ok(
                movieService.getMovieById(id)
        );

    }

    @GetMapping("/tmdb/{tmdbId}")
    public ResponseEntity<MovieResponse> getMovieByTmdbId(
            @PathVariable Long tmdbId
    ) {

        return ResponseEntity.ok(
                movieService.getMovieByTmdbId(tmdbId)
        );

    }

    @GetMapping("/search")
    public ResponseEntity<List<MovieResponse>> searchByTitle(
            @RequestParam String title
    ) {

        return ResponseEntity.ok(
                movieService.searchByTitle(title)
        );

    }

    @GetMapping("/popular")
    public ResponseEntity<List<MovieResponse>> getPopularMovies() {

        return ResponseEntity.ok(
                movieService.getPopularMovies()
        );

    }

    @GetMapping("/top-rated")
    public ResponseEntity<List<MovieResponse>> getTopRatedMovies() {

        return ResponseEntity.ok(
                movieService.getTopRatedMovies()
        );

    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<MovieResponse> createMovie(
            @Valid @RequestBody MovieRequest request
    ) {

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(
                        movieService.createMovie(request)
                );

    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<MovieResponse> updateMovie(
            @PathVariable Long id,
            @Valid @RequestBody MovieRequest request
    ) {

        return ResponseEntity.ok(
                movieService.updateMovie(id, request)
        );

    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMovie(
            @PathVariable Long id
    ) {

        movieService.deleteMovie(id);

        return ResponseEntity.noContent().build();

    }

}