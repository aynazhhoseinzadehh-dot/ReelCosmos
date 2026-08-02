import api from "../api/axios";

import type { Genre } from "../types/genre";

const GENRES_URL = "/api/genres";

export const getGenres = async (): Promise<Genre[]> => {
    const response =
        await api.get<Genre[]>(GENRES_URL);

    return response.data;
};

export const createGenre = async (
    data: Omit<Genre, "id">
): Promise<Genre> => {

    const response =
        await api.post<Genre>(
            GENRES_URL,
            data
        );

    return response.data;
};

export const updateGenre = async (
    id: number,
    data: Omit<Genre, "id">
): Promise<Genre> => {

    const response =
        await api.put<Genre>(
            `${GENRES_URL}/${id}`,
            data
        );

    return response.data;
};

export const deleteGenre = async (
    id: number
): Promise<void> => {

    await api.delete(
        `${GENRES_URL}/${id}`
    );

};