package com.reelcosmos.repository;

import com.reelcosmos.entity.Movie;
import com.reelcosmos.entity.Rating;
import com.reelcosmos.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface RatingRepository extends JpaRepository<Rating, Long> {

    Optional<Rating> findByUserAndMovie(User user, Movie movie);

    List<Rating> findByMovie(Movie movie);

    List<Rating> findByUser(User user);

}