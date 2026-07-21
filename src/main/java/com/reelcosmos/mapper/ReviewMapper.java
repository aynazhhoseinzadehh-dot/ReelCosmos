package com.reelcosmos.mapper;

import com.reelcosmos.dto.request.ReviewRequest;
import com.reelcosmos.dto.response.ReviewResponse;
import com.reelcosmos.entity.Review;
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
public interface ReviewMapper {


    @Mapping(target = "user", ignore = true)
    @Mapping(target = "movie", ignore = true)
    Review toEntity(ReviewRequest request);

    ReviewResponse toResponse(Review review);

    @BeanMapping(
            nullValuePropertyMappingStrategy =
                    NullValuePropertyMappingStrategy.IGNORE
    )
    @Mapping(target = "user", ignore = true)
    @Mapping(target = "movie", ignore = true)
    void updateEntity(
            ReviewRequest request,
            @MappingTarget Review review
    );
}