package com.reelcosmos.service.impl;

import com.reelcosmos.dto.request.ActorRequest;
import com.reelcosmos.dto.response.ActorResponse;
import com.reelcosmos.entity.Actor;
import com.reelcosmos.exception.DuplicateResourceException;
import com.reelcosmos.exception.ResourceNotFoundException;
import com.reelcosmos.mapper.ActorMapper;
import com.reelcosmos.repository.ActorRepository;
import com.reelcosmos.service.auth.ActorService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class ActorServiceImpl implements ActorService {

    private final ActorRepository actorRepository;
    private final ActorMapper actorMapper;

    // =====================================================
    // Helper
    // =====================================================

    private Actor findActor(Long id) {

        return actorRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Actor not found.")
                );

    }

    // =====================================================
    // CRUD
    // =====================================================

    @Override
    public ActorResponse createActor(ActorRequest request) {

        if (actorRepository.findByTmdbId(request.getTmdbId()).isPresent()) {

            throw new DuplicateResourceException(
                    "Actor already exists."
            );

        }

        Actor actor = actorMapper.toEntity(request);

        Actor savedActor = actorRepository.save(actor);

        return actorMapper.toResponse(savedActor);

    }

    @Override
    public ActorResponse updateActor(
            Long id,
            ActorRequest request
    ) {

        Actor actor = findActor(id);

        if (request.getTmdbId() != null
                && !request.getTmdbId().equals(actor.getTmdbId())) {

            Actor existingActor = actorRepository
                    .findByTmdbId(request.getTmdbId())
                    .orElse(null);

            if (existingActor != null
                    && !existingActor.getId().equals(id)) {

                throw new DuplicateResourceException(
                        "Actor already exists."
                );

            }

        }

        actorMapper.updateEntity(request, actor);

        Actor updatedActor = actorRepository.save(actor);

        return actorMapper.toResponse(updatedActor);

    }

    @Override
    public void deleteActor(Long id) {

        Actor actor = findActor(id);

        actorRepository.delete(actor);

    }

    // =====================================================
    // Read
    // =====================================================

    @Override
    @Transactional(readOnly = true)
    public ActorResponse getActorById(Long id) {

        return actorMapper.toResponse(
                findActor(id)
        );

    }

    @Override
    @Transactional(readOnly = true)
    public ActorResponse getActorByTmdbId(Long tmdbId) {

        Actor actor = actorRepository.findByTmdbId(tmdbId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Actor not found.")
                );

        return actorMapper.toResponse(actor);

    }

    @Override
    @Transactional(readOnly = true)
    public Page<ActorResponse> getActors(
            String name,
            Pageable pageable
    ) {

        Page<Actor> page;

        if (name == null || name.isBlank()) {

            page = actorRepository.findAll(pageable);

        } else {

            page = actorRepository.findByNameContainingIgnoreCase(
                    name,
                    pageable
            );

        }

        return page.map(actorMapper::toResponse);

    }



}