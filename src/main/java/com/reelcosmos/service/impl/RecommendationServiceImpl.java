package com.reelcosmos.service.impl;


import com.reelcosmos.dto.response.RecommendationResponse;
import com.reelcosmos.entity.Movie;
import com.reelcosmos.repository.MovieRepository;
import com.reelcosmos.service.auth.RecommendationService;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.List;


@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class RecommendationServiceImpl
        implements RecommendationService {


    private final MovieRepository movieRepository;



    @Override
    public List<RecommendationResponse> getRecommendations() {


        return movieRepository
                .findTop10ByOrderByAverageRatingDesc()

                .stream()

                .map(movie ->

                        RecommendationResponse.builder()

                                .id(movie.getId())

                                .title(movie.getTitle())

                                .posterUrl(movie.getPosterUrl())

                                .averageRating(
                                        movie.getAverageRating()
                                )

                                .build()

                )

                .toList();

    }

}