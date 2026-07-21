package com.reelcosmos.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class MovieActorResponse {

    private Long id;

    private ActorResponse actor;

    private String characterName;

    private Integer castOrder;

}