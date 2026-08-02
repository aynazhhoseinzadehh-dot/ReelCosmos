package com.reelcosmos.service.auth;

import com.reelcosmos.dto.response.RecommendationResponse;

import java.util.List;

public interface RecommendationService {


    List<RecommendationResponse> getRecommendations();

}
