import api from "../api/axios";

import type { Actor } from "../types/actor";


export const getActors = async (): Promise<Actor[]> => {

    const response =
        await api.get<Actor[]>("/api/actors");


    return response.data;

};