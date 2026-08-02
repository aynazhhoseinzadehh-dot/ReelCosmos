import api from "../api/axios";

import type {
    Movie,
    MovieRequest,
} from "../types/movie";

const MOVIES_URL = "/api/movies";

// ======================================
// Pagination Response
// ======================================

export interface MoviePage {

    content: Movie[];

    totalPages: number;

    totalElements: number;

    number: number;

    size: number;

}

// ======================================
// Get Movies
// ======================================

export const getMovies =
    async (
        page = 0,
        size = 20,
        title = ""
    ): Promise<MoviePage> => {

        const response =
            await api.get<MoviePage>(
                MOVIES_URL,
                {

                    params: {

                        page,

                        size,

                        title,

                    },

                }
            );

        return response.data;

    };

// ======================================
// Get Movie By Id
// ======================================

export const getMovieById =
    async (
        id: number
    ): Promise<Movie> => {

        const response =
            await api.get<Movie>(
                `${MOVIES_URL}/${id}`
            );

        return response.data;

    };

// ======================================
// Create Movie
// ======================================

export const createMovie =
    async (
        data: MovieRequest
    ): Promise<Movie> => {

        const response =
            await api.post<Movie>(
                MOVIES_URL,
                data
            );

        return response.data;

    };

// ======================================
// Update Movie
// ======================================

export const updateMovie =
    async (
        id: number,
        data: MovieRequest
    ): Promise<Movie> => {

        const response =
            await api.put<Movie>(
                `${MOVIES_URL}/${id}`,
                data
            );

        return response.data;

    };

export const getAllMovies = async (): Promise<Movie[]> => {

    const response = await api.get(
        `${MOVIES_URL}?size=1000`
    );

    return response.data.content;

};

// ======================================
// Delete Movie
// ======================================

export const deleteMovie =
    async (
        id: number
    ): Promise<void> => {

        await api.delete(
            `${MOVIES_URL}/${id}`
        );

    };