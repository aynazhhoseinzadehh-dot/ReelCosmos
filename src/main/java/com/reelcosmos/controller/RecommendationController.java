package com.reelcosmos.controller;


import com.reelcosmos.dto.response.RecommendationResponse;
import com.reelcosmos.service.auth.RecommendationService;

import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;


import java.util.List;



@RestController
@RequestMapping("/api/recommendations")
@RequiredArgsConstructor
@PreAuthorize("isAuthenticated()")
public class RecommendationController {


    private final RecommendationService recommendationService;



    @GetMapping
    public ResponseEntity<List<RecommendationResponse>> getRecommendations(){


        return ResponseEntity.ok(
                recommendationService.getRecommendations()
        );


    }


}