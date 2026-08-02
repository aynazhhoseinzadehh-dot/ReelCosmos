package com.reelcosmos.service.impl;

import com.reelcosmos.dto.request.GenreRequest;
import com.reelcosmos.dto.response.GenreResponse;
import com.reelcosmos.entity.Genre;
import com.reelcosmos.exception.DuplicateResourceException;
import com.reelcosmos.exception.ResourceNotFoundException;
import com.reelcosmos.mapper.GenreMapper;
import com.reelcosmos.repository.GenreRepository;
import com.reelcosmos.service.auth.GenreService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class GenreServiceImpl implements GenreService {

    private final GenreRepository genreRepository;

    private final GenreMapper genreMapper;

    // =====================================================
    // Helper
    // =====================================================

    private Genre findGenre(Long id) {

        return genreRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Genre not found.")
                );

    }

    // =====================================================
    // CRUD
    // =====================================================

    @Override
    public GenreResponse createGenre(GenreRequest request) {

        if (genreRepository.existsByName(request.getName())) {

            throw new DuplicateResourceException(
                    "Genre already exists."
            );

        }

        Genre genre = genreMapper.toEntity(request);

        return genreMapper.toResponse(
                genreRepository.save(genre)
        );

    }

    @Override
    public GenreResponse updateGenre(
            Long id,
            GenreRequest request
    ) {

        Genre genre = findGenre(id);

        if (request.getName() != null
                && !genre.getName().equalsIgnoreCase(request.getName())
                && genreRepository.existsByName(request.getName())) {

            throw new DuplicateResourceException(
                    "Genre already exists."
            );

        }

        genreMapper.updateEntity(request, genre);

        return genreMapper.toResponse(
                genreRepository.save(genre)
        );

    }

    @Override
    public void deleteGenre(Long id) {

        Genre genre = findGenre(id);

        genreRepository.delete(genre);

    }

    @Override
    @Transactional(readOnly = true)
    public GenreResponse getGenreById(Long id) {

        return genreMapper.toResponse(
                findGenre(id)
        );

    }

    @Override
    @Transactional(readOnly = true)
    public Page<GenreResponse> getGenres(
            String name,
            Pageable pageable
    ) {

        Page<Genre> page;

        if (name == null || name.isBlank()) {

            page = genreRepository.findAll(pageable);

        } else {

            page = genreRepository.findByNameContainingIgnoreCase(
                    name,
                    pageable
            );

        }

        return page.map(genreMapper::toResponse);

    }

}