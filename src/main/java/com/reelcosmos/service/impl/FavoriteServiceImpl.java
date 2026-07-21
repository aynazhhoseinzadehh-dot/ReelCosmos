package com.reelcosmos.service.impl;

import com.reelcosmos.dto.response.MovieResponse;
import com.reelcosmos.entity.Favorite;
import com.reelcosmos.entity.Movie;
import com.reelcosmos.entity.User;
import com.reelcosmos.exception.DuplicateResourceException;
import com.reelcosmos.exception.ResourceNotFoundException;
import com.reelcosmos.exception.UnauthorizedException;
import com.reelcosmos.mapper.MovieMapper;
import com.reelcosmos.repository.FavoriteRepository;
import com.reelcosmos.repository.MovieRepository;
import com.reelcosmos.repository.UserRepository;
import com.reelcosmos.security.SecurityUtils;
import com.reelcosmos.service.auth.FavoriteService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class FavoriteServiceImpl implements FavoriteService {

    private final FavoriteRepository favoriteRepository;

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
    public void addFavorite(Long movieId) {

        User currentUser = getCurrentUser();

        Movie movie = findMovie(movieId);

        if (favoriteRepository.existsByUserAndMovie(currentUser, movie)) {

            throw new DuplicateResourceException(
                    "Movie is already in favorites."
            );

        }

        Favorite favorite = new Favorite();

        favorite.setUser(currentUser);

        favorite.setMovie(movie);

        favoriteRepository.save(favorite);

    }

    @Override
    public void removeFavorite(Long movieId) {

        User currentUser = getCurrentUser();

        Movie movie = findMovie(movieId);

        if (!favoriteRepository.existsByUserAndMovie(currentUser, movie)) {

            throw new ResourceNotFoundException(
                    "Favorite not found."
            );

        }

        favoriteRepository.deleteByUserAndMovie(currentUser, movie);

    }

    // =====================================================
    // Read
    // =====================================================

    @Override
    @Transactional(readOnly = true)
    public List<MovieResponse> getCurrentUserFavorites() {

        User currentUser = getCurrentUser();

        return favoriteRepository.findByUser(currentUser)
                .stream()
                .map(Favorite::getMovie)
                .map(movieMapper::toResponse)
                .toList();

    }

}