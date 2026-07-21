package com.reelcosmos.service.auth;

import com.reelcosmos.dto.request.GenreRequest;
import com.reelcosmos.dto.response.GenreResponse;

import java.util.List;

public interface GenreService {

    GenreResponse createGenre(GenreRequest request);

    GenreResponse updateGenre(Long id, GenreRequest request);

    void deleteGenre(Long id);

    GenreResponse getGenreById(Long id);

    List<GenreResponse> getAllGenres();

}