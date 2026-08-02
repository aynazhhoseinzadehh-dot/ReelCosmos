package com.reelcosmos.controller;

import com.reelcosmos.dto.request.GenreRequest;
import com.reelcosmos.dto.response.GenreResponse;
import com.reelcosmos.service.auth.GenreService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import java.util.List;

@RestController
@RequestMapping("/api/genres")
@RequiredArgsConstructor
public class GenreController {

    private final GenreService genreService;




    @GetMapping("/{id}")
    public ResponseEntity<GenreResponse> getGenreById(
            @PathVariable Long id
    ) {

        return ResponseEntity.ok(
                genreService.getGenreById(id)
        );

    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<GenreResponse> createGenre(
            @Valid @RequestBody GenreRequest request
    ) {

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(
                        genreService.createGenre(request)
                );

    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<GenreResponse> updateGenre(
            @PathVariable Long id,
            @Valid @RequestBody GenreRequest request
    ) {

        return ResponseEntity.ok(
                genreService.updateGenre(id, request)
        );

    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteGenre(
            @PathVariable Long id
    ) {

        genreService.deleteGenre(id);

        return ResponseEntity.noContent().build();

    }


    @GetMapping
    public ResponseEntity<Page<GenreResponse>> getGenres(

            @RequestParam(required = false)
            String name,

            @RequestParam(defaultValue = "0")
            int page,

            @RequestParam(defaultValue = "10")
            int size

    ) {

        Pageable pageable =
                PageRequest.of(page, size);

        return ResponseEntity.ok(

                genreService.getGenres(
                        name,
                        pageable
                )

        );

    }
}