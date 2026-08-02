package com.reelcosmos.repository;

import com.reelcosmos.entity.Genre;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.util.Optional;

public interface GenreRepository extends JpaRepository<Genre, Long> {

    Optional<Genre> findByName(String name);

    boolean existsByName(String name);

    Page<Genre> findByNameContainingIgnoreCase(
            String name,
            Pageable pageable
    );
}