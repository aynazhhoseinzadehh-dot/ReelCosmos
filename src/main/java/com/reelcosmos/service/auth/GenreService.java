package com.reelcosmos.service.auth;

import com.reelcosmos.dto.request.GenreRequest;
import com.reelcosmos.dto.response.GenreResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.util.List;

public interface GenreService {

    GenreResponse createGenre(GenreRequest request);

    GenreResponse updateGenre(Long id, GenreRequest request);

    void deleteGenre(Long id);

    GenreResponse getGenreById(Long id);

    Page<GenreResponse> getGenres(
            String name,
            Pageable pageable
    );

}