import api from "../api/axios";
import type { Movie } from "../types/movie";

const FAVORITES_URL = "/api/favorites";

export const getFavorites = async (): Promise<Movie[]> => {
    const response = await api.get<Movie[]>(
        `${FAVORITES_URL}/me`
    );

    return response.data;
};

export const addFavorite = async (
    movieId: number
): Promise<void> => {
    await api.post(
        `${FAVORITES_URL}/${movieId}`
    );
};

export const removeFavorite = async (
    movieId: number
): Promise<void> => {
    await api.delete(
        `${FAVORITES_URL}/${movieId}`
    );
};