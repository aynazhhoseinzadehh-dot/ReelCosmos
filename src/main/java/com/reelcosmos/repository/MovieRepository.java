package com.reelcosmos.repository;

import com.reelcosmos.entity.Movie;
import com.reelcosmos.entity.MovieStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface MovieRepository extends JpaRepository<Movie, Long> {

    Optional<Movie> findByTmdbId(Long tmdbId);

    boolean existsByTmdbId(Long tmdbId);

    List<Movie> findByTitleContainingIgnoreCase(String title);

    List<Movie> findByStatus(MovieStatus status);

    List<Movie> findTop10ByOrderByPopularityDesc();

    List<Movie> findTop10ByOrderByAverageRatingDesc();

    Page<Movie> findByTitleContainingIgnoreCase(
            String title,
            Pageable pageable
    );

}