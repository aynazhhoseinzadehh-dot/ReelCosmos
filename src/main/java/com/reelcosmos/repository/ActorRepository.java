package com.reelcosmos.repository;

import com.reelcosmos.entity.Actor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.util.List;
import java.util.Optional;

public interface ActorRepository extends JpaRepository<Actor, Long> {

    Optional<Actor> findByTmdbId(Long tmdbId);

    Page<Actor> findByNameContainingIgnoreCase(
            String name,
            Pageable pageable
    );

}