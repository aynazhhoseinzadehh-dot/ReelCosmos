package com.reelcosmos.service.impl;

import com.reelcosmos.dto.response.MovieResponse;
import com.reelcosmos.entity.Movie;
import com.reelcosmos.entity.User;
import com.reelcosmos.entity.Watchlist;
import com.reelcosmos.exception.DuplicateResourceException;
import com.reelcosmos.exception.ResourceNotFoundException;
import com.reelcosmos.exception.UnauthorizedException;
import com.reelcosmos.mapper.MovieMapper;
import com.reelcosmos.repository.MovieRepository;
import com.reelcosmos.repository.UserRepository;
import com.reelcosmos.repository.WatchlistRepository;
import com.reelcosmos.security.SecurityUtils;
import com.reelcosmos.service.auth.WatchlistService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class WatchlistServiceImpl implements WatchlistService {

    private final WatchlistRepository watchlistRepository;

    private final MovieRepository movieRepository;

    private final UserRepository userRepository;

    private final MovieMapper movieMapper;

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
    // =====================================================
    // CRUD
    // =====================================================

    @Override
    public void addToWatchlist(Long movieId) {

        User currentUser = getCurrentUser();

        Movie movie = findMovie(movieId);

        if (watchlistRepository.existsByUserAndMovie(currentUser, movie)) {

            throw new DuplicateResourceException(
                    "Movie is already in watchlist."
            );

        }

        Watchlist watchlist = new Watchlist();

        watchlist.setUser(currentUser);

        watchlist.setMovie(movie);

        watchlistRepository.save(watchlist);

    }

    @Override
    public void removeFromWatchlist(Long movieId) {

        User currentUser = getCurrentUser();

        Movie movie = findMovie(movieId);

        if (!watchlistRepository.existsByUserAndMovie(currentUser, movie)) {

            throw new ResourceNotFoundException(
                    "Movie is not in watchlist."
            );

        }

        watchlistRepository.deleteByUserAndMovie(currentUser, movie);

    }

    // =====================================================
    // Read
    // =====================================================

    @Override
    @Transactional(readOnly = true)
    public List<MovieResponse> getCurrentUserWatchlist() {

        User currentUser = getCurrentUser();

        return watchlistRepository.findByUser(currentUser)
                .stream()
                .map(Watchlist::getMovie)
                .map(movieMapper::toResponse)
                .toList();

    }

}