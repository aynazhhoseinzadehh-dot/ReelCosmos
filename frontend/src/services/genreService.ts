import api from "../api/axios";

import type { Genre } from "../types/genre";


export const getGenres = async (): Promise<Genre[]> => {

    const response =
        await api.get<Genre[]>("/api/genres");


    return response.data;

};