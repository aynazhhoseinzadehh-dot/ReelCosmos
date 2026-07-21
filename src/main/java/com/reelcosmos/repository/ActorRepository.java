package com.reelcosmos.repository;

import com.reelcosmos.entity.Actor;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ActorRepository extends JpaRepository<Actor, Long> {

    Optional<Actor> findByTmdbId(Long tmdbId);

    List<Actor> findByNameContainingIgnoreCase(String name);

}