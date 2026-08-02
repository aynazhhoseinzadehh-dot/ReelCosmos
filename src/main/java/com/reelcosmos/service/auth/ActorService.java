package com.reelcosmos.service.auth;

import com.reelcosmos.dto.request.ActorRequest;
import com.reelcosmos.dto.response.ActorResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.util.List;

public interface ActorService {

    ActorResponse createActor(ActorRequest request);

    ActorResponse updateActor(Long id, ActorRequest request);

    void deleteActor(Long id);

    ActorResponse getActorById(Long id);

    ActorResponse getActorByTmdbId(Long tmdbId);

    Page<ActorResponse> getActors(
            String name,
            Pageable pageable
    );

}