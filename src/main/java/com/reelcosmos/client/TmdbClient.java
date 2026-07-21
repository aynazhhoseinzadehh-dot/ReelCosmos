package com.reelcosmos.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.Map;

@FeignClient(
        name = "tmdbClient",
        url = "${tmdb.base-url}"
)
public interface TmdbClient {

    @GetMapping("/movie/popular")
    Map<String, Object> getPopularMovies(
            @RequestParam("api_key") String apiKey,
            @RequestParam(value = "page", defaultValue = "1") Integer page
    );

    @GetMapping("/movie/top_rated")
    Map<String, Object> getTopRatedMovies(
            @RequestParam("api_key") String apiKey,
            @RequestParam(value = "page", defaultValue = "1") Integer page
    );

    @GetMapping("/movie/upcoming")
    Map<String, Object> getUpcomingMovies(
            @RequestParam("api_key") String apiKey,
            @RequestParam(value = "page", defaultValue = "1") Integer page
    );

    @GetMapping("/movie/now_playing")
    Map<String, Object> getNowPlayingMovies(
            @RequestParam("api_key") String apiKey,
            @RequestParam(value = "page", defaultValue = "1") Integer page
    );

    @GetMapping("/search/movie")
    Map<String, Object> searchMovie(
            @RequestParam("api_key") String apiKey,
            @RequestParam("query") String query,
            @RequestParam(value = "page", defaultValue = "1") Integer page
    );

    @GetMapping("/movie/{movieId}")
    Map<String, Object> getMovieDetails(
            @org.springframework.web.bind.annotation.PathVariable Long movieId,
            @RequestParam("api_key") String apiKey
    );

    @GetMapping("/movie/{movieId}/credits")
    Map<String, Object> getMovieCredits(
            @org.springframework.web.bind.annotation.PathVariable Long movieId,
            @RequestParam("api_key") String apiKey
    );
}