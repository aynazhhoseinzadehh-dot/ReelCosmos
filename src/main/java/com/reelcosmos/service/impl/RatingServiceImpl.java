package com.reelcosmos.service.impl;

import com.reelcosmos.dto.request.RatingRequest;
import com.reelcosmos.dto.response.RatingResponse;
import com.reelcosmos.entity.Movie;
import com.reelcosmos.entity.Rating;
import com.reelcosmos.entity.Role;
import com.reelcosmos.entity.User;
import com.reelcosmos.exception.DuplicateResourceException;
import com.reelcosmos.exception.ResourceNotFoundException;
import com.reelcosmos.exception.UnauthorizedException;
import com.reelcosmos.mapper.RatingMapper;
import com.reelcosmos.repository.MovieRepository;
import com.reelcosmos.repository.RatingRepository;
import com.reelcosmos.repository.UserRepository;
import com.reelcosmos.security.SecurityUtils;
import com.reelcosmos.service.auth.RatingService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class RatingServiceImpl implements RatingService {

    private final RatingRepository ratingRepository;
    private final MovieRepository movieRepository;
    private final UserRepository userRepository;
    private final RatingMapper ratingMapper;

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

    private Rating findRating(Long ratingId) {

        return ratingRepository.findById(ratingId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Rating not found.")
                );

    }

    private void validateOwner(
            Rating rating,
            User currentUser
    ) {

        boolean isOwner =
                rating.getUser().getId().equals(currentUser.getId());

        boolean isAdmin =
                currentUser.getRole() == Role.ADMIN;

        if (!isOwner && !isAdmin) {

            throw new AccessDeniedException(
                    "You are not allowed to modify this rating."
            );

        }

    }

        /**
         Recalculate average rating and vote count.
         */
         private void recalculateMovieRating(Movie movie) {

         List<Rating> ratings =
         ratingRepository.findByMovie(movie);

         int voteCount = ratings.size();

         double average = 0.0;

         if (!ratings.isEmpty()) {

         average = ratings.stream()
         .mapToDouble(Rating::getScore)
         .average()
         .orElse(0.0);

         }

         movie.setVoteCount(voteCount);
         movie.setAverageRating(average);

         movieRepository.save(movie);

         }

         // =====================================================
         // CRUD
         // =====================================================

         @Override
         public RatingResponse createRating(
         Long movieId,
         RatingRequest request
         ) {

         User currentUser = getCurrentUser();

         Movie movie = findMovie(movieId);

         if (ratingRepository.findByUserAndMovie(currentUser, movie).isPresent()) {

            throw new DuplicateResourceException(
         "You have already rated this movie."
         );

         }

         Rating rating = ratingMapper.toEntity(request);

         rating.setUser(currentUser);
         rating.setMovie(movie);

         Rating savedRating = ratingRepository.save(rating);

         recalculateMovieRating(movie);

         return ratingMapper.toResponse(savedRating);

         }


            @Override
            public RatingResponse updateRating(
                    Long ratingId,
                    RatingRequest request
            ) {

                User currentUser = getCurrentUser();

                Rating rating = findRating(ratingId);

                validateOwner(rating, currentUser);

                ratingMapper.updateEntity(request, rating);

                Rating updatedRating = ratingRepository.save(rating);

                recalculateMovieRating(rating.getMovie());

                return ratingMapper.toResponse(updatedRating);

            }

            @Override
            public void deleteRating(Long ratingId) {

                User currentUser = getCurrentUser();

                Rating rating = findRating(ratingId);

                validateOwner(rating, currentUser);

                Movie movie = rating.getMovie();

                ratingRepository.delete(rating);

                recalculateMovieRating(movie);

            }

            // =====================================================
            // Read
            // =====================================================

            @Override
            @Transactional(readOnly = true)
            public RatingResponse getRatingById(Long ratingId) {

                return ratingMapper.toResponse(
                        findRating(ratingId)
                );

            }

            @Override
            @Transactional(readOnly = true)
            public List<RatingResponse> getRatingsByMovie(Long movieId) {

                Movie movie = findMovie(movieId);

                return ratingRepository.findByMovie(movie)
                        .stream()
                        .map(ratingMapper::toResponse)
                        .toList();

            }

            @Override
            @Transactional(readOnly = true)
            public List<RatingResponse> getCurrentUserRatings() {

                User currentUser = getCurrentUser();

                return ratingRepository.findByUser(currentUser)
                        .stream()
                        .map(ratingMapper::toResponse)
                        .toList();

            }

        }
