package com.reelcosmos.repository;

import com.reelcosmos.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {



    Optional<User> findByUsername(String username);

    Optional<User> findByEmail(String email);
    Optional<User> findByUsernameOrEmail(
            String username,
            String email


    );


    Page<User> findByUsernameContainingIgnoreCaseOrEmailContainingIgnoreCase(
            String username,
            String email,
            Pageable pageable
    );
    boolean existsByUsername(String username);

    boolean existsByEmail(String email);

}