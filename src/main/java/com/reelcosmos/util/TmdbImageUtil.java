package com.reelcosmos.util;

import com.reelcosmos.config.TmdbProperties;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class TmdbImageUtil {

    private final TmdbProperties tmdbProperties;

    /**
     * Build full TMDB image URL.
     */
    private String buildImageUrl(
            String size,
            String path
    ) {

        if (path == null || path.isBlank()) {
            return null;
        }

        return tmdbProperties.getImageBaseUrl()
                + "/"
                + size
                + path;

    }

    /**
     * Poster Image
     */
    public String poster(String path) {

        return buildImageUrl(
                "w500",
                path
        );

    }

    /**
     * Backdrop Image
     */
    public String backdrop(String path) {

        return buildImageUrl(
                "w780",
                path
        );

    }

    /**
     * Actor Profile Image
     */
    public String profile(String path) {

        return buildImageUrl(
                "w500",
                path
        );

    }

    /**
     * Original Size Image
     */
    public String original(String path) {

        return buildImageUrl(
                "original",
                path
        );

    }

}