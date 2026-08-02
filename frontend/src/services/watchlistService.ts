import api from "../api/axios";

import type { Movie } from "../types/movie";

const WATCHLIST_URL = "/api/watchlist";

export const getWatchlist = async (): Promise<Movie[]> => {
    const response = await api.get<Movie[]>(
        `${WATCHLIST_URL}/me`
    );

    return response.data;
};

export const addToWatchlist = async (
    movieId: number
): Promise<void> => {

    await api.post(
        `${WATCHLIST_URL}/${movieId}`
    );

};

export const removeFromWatchlist = async (
    movieId: number
): Promise<void> => {

    await api.delete(
        `${WATCHLIST_URL}/${movieId}`
    );

};