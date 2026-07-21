package com.reelcosmos.repository;

import com.reelcosmos.entity.Actor;
import com.reelcosmos.entity.Movie;
import com.reelcosmos.entity.MovieActor;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MovieActorRepository extends JpaRepository<MovieActor, Long> {

    List<MovieActor> findByMovie(Movie movie);

    List<MovieActor> findByActor(Actor actor);
}