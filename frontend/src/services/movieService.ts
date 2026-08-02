import api from "../api/axios";
import type {Movie, MoviePage} from "../types/movie";

const MOVIES_URL = "/api/movies";

export const getMovies = async (
    page = 0,
    size = 20,
    sort = "popularity,desc"
): Promise<MoviePage> => {
    const response = await api.get<MoviePage>(MOVIES_URL, {
        params: {
            page,
            size,
            sort,
        },
    });

    return response.data;
};

export const searchMovies = async (
    title: string
): Promise<MoviePage> => {
    const response = await api.get<MoviePage>(MOVIES_URL, {
        params: {
            title,
        },
    });

    return response.data;
};

export const getMovieById = async (
    id: number
): Promise<Movie> => {
    const response = await api.get<Movie>(
        `${MOVIES_URL}/${id}`
    );

    return response.data;
};

export const getMovieByTmdbId = async (
    tmdbId: number
): Promise<Movie> => {
    const response = await api.get<Movie>(
        `${MOVIES_URL}/tmdb/${tmdbId}`
    );

    return response.data;
};

export const getPopularMovies = async (): Promise<Movie[]> => {
    const response = await api.get<Movie[]>(
        `${MOVIES_URL}/popular`
    );

    return response.data;
};

export const getTopRatedMovies = async (): Promise<Movie[]> => {
    const response = await api.get<Movie[]>(
        `${MOVIES_URL}/top-rated`
    );

    return response.data;
};