package com.reelcosmos.controller;

import com.reelcosmos.dto.request.ActorRequest;
import com.reelcosmos.dto.response.ActorResponse;
import com.reelcosmos.service.auth.ActorService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/actors")
@RequiredArgsConstructor
public class ActorController {

    private final ActorService actorService;

    @GetMapping
    public ResponseEntity<List<ActorResponse>> getAllActors() {

        return ResponseEntity.ok(
                actorService.getAllActors()
        );

    }

    @GetMapping("/{id}")
    public ResponseEntity<ActorResponse> getActorById(
            @PathVariable Long id
    ) {

        return ResponseEntity.ok(
                actorService.getActorById(id)
        );

    }

    @GetMapping("/tmdb/{tmdbId}")
    public ResponseEntity<ActorResponse> getActorByTmdbId(
            @PathVariable Long tmdbId
    ) {

        return ResponseEntity.ok(
                actorService.getActorByTmdbId(tmdbId)
        );

    }

    @GetMapping("/search")
    public ResponseEntity<List<ActorResponse>> searchActors(
            @RequestParam String name
    ) {

        return ResponseEntity.ok(
                actorService.searchByName(name)
        );

    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<ActorResponse> createActor(
            @Valid @RequestBody ActorRequest request
    ) {

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(
                        actorService.createActor(request)
                );

    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<ActorResponse> updateActor(
            @PathVariable Long id,
            @Valid @RequestBody ActorRequest request
    ) {

        return ResponseEntity.ok(
                actorService.updateActor(id, request)
        );

    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteActor(
            @PathVariable Long id
    ) {

        actorService.deleteActor(id);

        return ResponseEntity.noContent().build();

    }

}