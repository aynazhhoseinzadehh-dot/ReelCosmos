package com.reelcosmos.mapper;

import com.reelcosmos.dto.request.WatchedMovieRequest;
import com.reelcosmos.dto.response.WatchedMovieResponse;
import com.reelcosmos.entity.WatchedMovie;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;
import org.mapstruct.ReportingPolicy;

@Mapper(
        componentModel = "spring",
        uses = {
                MovieMapper.class
        },
        unmappedTargetPolicy = ReportingPolicy.IGNORE
)
public interface WatchedMovieMapper {


    @Mapping(target = "user", ignore = true)
    @Mapping(target = "movie", ignore = true)
    @Mapping(target = "watchedAt", ignore = true)
    @Mapping(target = "lastWatched", ignore = true)
    WatchedMovie toEntity(WatchedMovieRequest request);

    WatchedMovieResponse toResponse(WatchedMovie watchedMovie);

    @BeanMapping(
            nullValuePropertyMappingStrategy =
                    NullValuePropertyMappingStrategy.IGNORE
    )
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "user", ignore = true)
    @Mapping(target = "movie", ignore = true)
    @Mapping(target = "watchedAt", ignore = true)
    @Mapping(target = "lastWatched", ignore = true)
    void updateEntity(
            WatchedMovieRequest request,
            @MappingTarget WatchedMovie watchedMovie
    );

}