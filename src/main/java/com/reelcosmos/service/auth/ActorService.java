package com.reelcosmos.service.auth;

import com.reelcosmos.dto.request.ActorRequest;
import com.reelcosmos.dto.response.ActorResponse;

import java.util.List;

public interface ActorService {

    ActorResponse createActor(ActorRequest request);

    ActorResponse updateActor(Long id, ActorRequest request);

    void deleteActor(Long id);

    ActorResponse getActorById(Long id);

    ActorResponse getActorByTmdbId(Long tmdbId);

    List<ActorResponse> getAllActors();

    List<ActorResponse> searchByName(String name);

}