package com.reelcosmos.service.impl;

import com.reelcosmos.dto.request.ReviewRequest;
import com.reelcosmos.dto.response.ReviewResponse;
import com.reelcosmos.entity.Movie;
import com.reelcosmos.entity.Review;
import com.reelcosmos.entity.Role;
import com.reelcosmos.entity.User;
import com.reelcosmos.exception.ResourceNotFoundException;
import com.reelcosmos.exception.UnauthorizedException;
import com.reelcosmos.mapper.ReviewMapper;
import com.reelcosmos.repository.MovieRepository;
import com.reelcosmos.repository.ReviewRepository;
import com.reelcosmos.repository.UserRepository;
import com.reelcosmos.security.SecurityUtils;
import com.reelcosmos.service.auth.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class ReviewServiceImpl implements ReviewService {

    private final ReviewRepository reviewRepository;
    private final MovieRepository movieRepository;
    private final UserRepository userRepository;
    private final ReviewMapper reviewMapper;

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

    private Review findReview(Long reviewId) {

        return reviewRepository.findById(reviewId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Review not found.")
                );

    }

    /**
     Owner can modify his review.
     Admin can modify every review.
     */
    private void validateOwner(
            Review review,
            User currentUser
    ) {

        boolean isOwner =
                review.getUser().getId().equals(currentUser.getId());

        boolean isAdmin =
                currentUser.getRole() == Role.ADMIN;

        if (!isOwner && !isAdmin) {

            throw new AccessDeniedException(
                    "You are not allowed to modify this review."
            );

        }

    }

    // =====================================================
    // CRUD
    // =====================================================

    @Override
    public ReviewResponse createReview(
            Long movieId,
            ReviewRequest request
    ) {

        User currentUser = getCurrentUser();

        Movie movie = findMovie(movieId);

        Review review = reviewMapper.toEntity(request);

        review.setUser(currentUser);
        review.setMovie(movie);

        Review savedReview = reviewRepository.save(review);

        return reviewMapper.toResponse(savedReview);

    }

    @Override
    public ReviewResponse updateReview(
            Long reviewId,
            ReviewRequest request
    ) {

        User currentUser = getCurrentUser();

        Review review = findReview(reviewId);

        validateOwner(review, currentUser);

        reviewMapper.updateEntity(request, review);

        Review updatedReview = reviewRepository.save(review);

        return reviewMapper.toResponse(updatedReview);

    }

    @Override
    public void deleteReview(Long reviewId) {

        User currentUser = getCurrentUser();

        Review review = findReview(reviewId);

        validateOwner(review, currentUser);

        reviewRepository.delete(review);

    }

// =====================================================
    // Read
    // =====================================================

    @Override
    @Transactional(readOnly = true)
    public ReviewResponse getReviewById(Long reviewId) {

        return reviewMapper.toResponse(
                findReview(reviewId)
        );

    }

    @Override
    @Transactional(readOnly = true)
    public List<ReviewResponse> getReviewsByMovie(Long movieId) {

        Movie movie = findMovie(movieId);

        return reviewRepository.findByMovie(movie)
                .stream()
                .map(reviewMapper::toResponse)
                .toList();

    }

    @Override
    @Transactional(readOnly = true)
    public List<ReviewResponse> getCurrentUserReviews() {

        User currentUser = getCurrentUser();

        return reviewRepository.findByUser(currentUser)
                .stream()
                .map(reviewMapper::toResponse)
                .toList();

    }

}