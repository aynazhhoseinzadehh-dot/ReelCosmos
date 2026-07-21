package com.reelcosmos.mapper;

import com.reelcosmos.dto.response.MovieActorResponse;
import com.reelcosmos.entity.MovieActor;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(
        componentModel = "spring",
        uses = ActorMapper.class,
        unmappedTargetPolicy = ReportingPolicy.IGNORE
)
public interface MovieActorMapper {

    MovieActorResponse toResponse(MovieActor movieActor);

}