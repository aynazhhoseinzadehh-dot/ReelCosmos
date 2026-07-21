package com.reelcosmos.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Getter
@Setter
@Component
@ConfigurationProperties(prefix = "tmdb")
public class TmdbProperties {

    /**
     * TMDB API Key
     */
    private String apiKey;

    /**
     * https://api.themoviedb.org/3
     */
    private String baseUrl;

    /**
     * https://image.tmdb.org/t/p
     */
    private String imageBaseUrl;

}