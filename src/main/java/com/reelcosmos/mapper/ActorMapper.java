package com.reelcosmos.mapper;

import com.reelcosmos.dto.request.ActorRequest;
import com.reelcosmos.dto.response.ActorResponse;
import com.reelcosmos.entity.Actor;
import org.mapstruct.*;

@Mapper(
        componentModel = "spring",
        unmappedTargetPolicy = ReportingPolicy.IGNORE
)
public interface ActorMapper {

    Actor toEntity(ActorRequest request);

    ActorResponse toResponse(Actor actor);

    @BeanMapping(
            nullValuePropertyMappingStrategy =
                    NullValuePropertyMappingStrategy.IGNORE
    )
    void updateEntity(
            ActorRequest request,
            @MappingTarget Actor actor
    );

}