package com.reelcosmos.mapper;

import com.reelcosmos.dto.request.RatingRequest;
import com.reelcosmos.dto.response.RatingResponse;
import com.reelcosmos.entity.Rating;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;
import org.mapstruct.ReportingPolicy;

@Mapper(
        componentModel = "spring",
        uses = {
                UserMapper.class,
                MovieMapper.class
        },
        unmappedTargetPolicy = ReportingPolicy.IGNORE
)
public interface RatingMapper {

    @Mapping(target = "user", ignore = true)
    @Mapping(target = "movie", ignore = true)
    Rating toEntity(RatingRequest request);

    RatingResponse toResponse(Rating rating);

    @BeanMapping(
            nullValuePropertyMappingStrategy =
                    NullValuePropertyMappingStrategy.IGNORE
    )
    @Mapping(target = "user", ignore = true)
    @Mapping(target = "movie", ignore = true)
    void updateEntity(
            RatingRequest request,
            @MappingTarget Rating rating
    );
}