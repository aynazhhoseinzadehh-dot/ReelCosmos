package com.reelcosmos.service.impl;

import com.reelcosmos.dto.request.WatchedMovieRequest;
import com.reelcosmos.dto.response.WatchedMovieResponse;
import com.reelcosmos.entity.Movie;
import com.reelcosmos.entity.User;
import com.reelcosmos.entity.WatchedMovie;
import com.reelcosmos.exception.ResourceNotFoundException;
import com.reelcosmos.exception.UnauthorizedException;
import com.reelcosmos.mapper.WatchedMovieMapper;
import com.reelcosmos.repository.MovieRepository;
import com.reelcosmos.repository.UserRepository;
import com.reelcosmos.repository.WatchedMovieRepository;
import com.reelcosmos.security.SecurityUtils;
import com.reelcosmos.service.auth.WatchedMovieService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class WatchedMovieServiceImpl implements WatchedMovieService {

    private final WatchedMovieRepository watchedMovieRepository;
    private final MovieRepository movieRepository;
    private final UserRepository userRepository;
    private final WatchedMovieMapper watchedMovieMapper;

    // =====================================================
    // Helpers
    // =====================================================

    private User getCurrentUser() {

        Long userId = SecurityUtils.getCurrentUserId();

        if (userId == null) {
            throw new UnauthorizedException(
                    "User is not authenticated."
            );
        }

        return userRepository.findById(userId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found.")
                );
    }

    private Movie findMovie(Long movieId) {

        return movieRepository.findById(movieId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Movie not found.")
                );
    }

    private WatchedMovie findWatchedMovie(Long watchedMovieId) {

        return watchedMovieRepository.findById(watchedMovieId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Watched movie not found."
                        )
                );
    }

    // =====================================================
    // CRUD
    // =====================================================

    @Override
    public WatchedMovieResponse markAsWatched(
            Long movieId,
            WatchedMovieRequest request
    ) {

        User currentUser = getCurrentUser();
        Movie movie = findMovie(movieId);

        WatchedMovie watchedMovie =
                watchedMovieRepository
                        .findByUserAndMovie(currentUser, movie)
                        .orElse(null);

        // Movie already watched -> increase rewatch count
        if (watchedMovie != null) {

            watchedMovie.setRewatchCount(
                    watchedMovie.getRewatchCount() + 1
            );

            watchedMovie.setLastWatched(
                    LocalDateTime.now()
            );

            WatchedMovie updated =
                    watchedMovieRepository.save(watchedMovie);

            return watchedMovieMapper.toResponse(updated);
        }

        // First watch
        watchedMovie = watchedMovieMapper.toEntity(request);

        watchedMovie.setUser(currentUser);
        watchedMovie.setMovie(movie);

        watchedMovie.setWatchedAt(LocalDateTime.now());
        watchedMovie.setLastWatched(LocalDateTime.now());
        watchedMovie.setRewatchCount(1);

        WatchedMovie saved =
                watchedMovieRepository.save(watchedMovie);

        return watchedMovieMapper.toResponse(saved);
    }

    @Override
    public void deleteWatchedMovie(Long watchedMovieId) {

        User currentUser = getCurrentUser();

        WatchedMovie watchedMovie =
                findWatchedMovie(watchedMovieId);

        if (!watchedMovie.getUser()
                .getId()
                .equals(currentUser.getId())) {

            throw new AccessDeniedException(
                    "You are not allowed to delete this record."
            );
        }

        watchedMovieRepository.delete(watchedMovie);
    }

    // =====================================================
    // Read
    // =====================================================

    @Override
    @Transactional(readOnly = true)
    public WatchedMovieResponse getWatchedMovieById(
            Long watchedMovieId
    ) {

        return watchedMovieMapper.toResponse(
                findWatchedMovie(watchedMovieId)
        );
    }

    @Override
    @Transactional(readOnly = true)
    public List<WatchedMovieResponse> getCurrentUserWatchedMovies() {

        User currentUser = getCurrentUser();

        return watchedMovieRepository.findByUser(currentUser)
                .stream()
                .map(watchedMovieMapper::toResponse)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public List<WatchedMovieResponse> getWatchedMoviesByMovie(
            Long movieId
    ) {

        Movie movie = findMovie(movieId);

        return watchedMovieRepository.findByMovie(movie)
                .stream()
                .map(watchedMovieMapper::toResponse)
                .toList();
    }
}