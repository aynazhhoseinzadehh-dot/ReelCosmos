package com.reelcosmos.mapper;

import com.reelcosmos.dto.request.MovieRequest;
import com.reelcosmos.dto.response.MovieResponse;
import com.reelcosmos.entity.Movie;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;
import org.mapstruct.ReportingPolicy;

@Mapper(
        componentModel = "spring",
        uses = {
                GenreMapper.class,
                MovieActorMapper.class
        },
        unmappedTargetPolicy = ReportingPolicy.IGNORE
)
public interface MovieMapper {

    @Mapping(target = "genres", ignore = true)
    @Mapping(target = "cast", ignore = true)
    @Mapping(target = "ratings", ignore = true)
    @Mapping(target = "reviews", ignore = true)
    @Mapping(target = "favorites", ignore = true)
    @Mapping(target = "watchlists", ignore = true)
    @Mapping(target = "watchedMovies", ignore = true)
    Movie toEntity(MovieRequest request);

    MovieResponse toResponse(Movie movie);

    @BeanMapping(
            nullValuePropertyMappingStrategy =
                    NullValuePropertyMappingStrategy.IGNORE
    )
    @Mapping(target = "genres", ignore = true)
    @Mapping(target = "cast", ignore = true)
    @Mapping(target = "ratings", ignore = true)
    @Mapping(target = "reviews", ignore = true)
    @Mapping(target = "favorites", ignore = true)
    @Mapping(target = "watchlists", ignore = true)
    @Mapping(target = "watchedMovies", ignore = true)
    void updateEntity(
            MovieRequest request,
            @MappingTarget Movie movie
    );

}