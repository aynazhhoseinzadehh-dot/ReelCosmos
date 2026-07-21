package com.reelcosmos.mapper;

import com.reelcosmos.dto.request.GenreRequest;
import com.reelcosmos.dto.response.GenreResponse;
import com.reelcosmos.entity.Genre;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;
import org.mapstruct.ReportingPolicy;

@Mapper(
        componentModel = "spring",
        unmappedTargetPolicy = ReportingPolicy.IGNORE
)
public interface GenreMapper {

    Genre toEntity(GenreRequest request);

    GenreResponse toResponse(Genre genre);

    @BeanMapping(
            nullValuePropertyMappingStrategy =
                    NullValuePropertyMappingStrategy.IGNORE
    )
    void updateEntity(
            GenreRequest request,
            @MappingTarget Genre genre
    );

}