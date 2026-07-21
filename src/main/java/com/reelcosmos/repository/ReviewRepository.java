package com.reelcosmos.repository;

import com.reelcosmos.entity.Movie;
import com.reelcosmos.entity.Review;
import com.reelcosmos.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long> {

    List<Review> findByMovie(Movie movie);

    List<Review> findByUser(User user);

}