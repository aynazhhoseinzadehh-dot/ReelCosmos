import api from "../api/axios";

import type {
    WatchedMovie,
} from "../types/watchedMovie";



const WATCHED_URL = "/api/watched";



export const getMyWatchedMovies =
    async (): Promise<WatchedMovie[]> => {

        const response =
            await api.get<WatchedMovie[]>(
                `${WATCHED_URL}/me`
            );


        return response.data;

    };




export const markMovieAsWatched =
    async (
        movieId:number
    ): Promise<WatchedMovie> => {


        const response =
            await api.post<WatchedMovie>(
                `${WATCHED_URL}/movie/${movieId}`,
                {}
            );


        return response.data;

    };




export const deleteWatchedMovie =
    async (
        id:number
    ): Promise<void> => {


        await api.delete(
            `${WATCHED_URL}/${id}`
        );


    };