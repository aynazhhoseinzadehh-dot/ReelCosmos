package com.reelcosmos.repository;

import com.reelcosmos.entity.Movie;
import com.reelcosmos.entity.User;
import com.reelcosmos.entity.WatchedMovie;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface WatchedMovieRepository extends JpaRepository<WatchedMovie, Long> {

    List<WatchedMovie> findByUser(User user);
    List<WatchedMovie> findByMovie(Movie movie);

    Optional<WatchedMovie> findByUserAndMovie(User user, Movie movie);

    boolean existsByUserAndMovie(User user, Movie movie);

}