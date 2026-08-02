import api from "../api/axios";

import type { Movie } from "../types/movie";


const RECOMMENDATION_URL =
    "/api/recommendations";



export const getRecommendations =
    async (): Promise<Movie[]> => {


        const response =
            await api.get<Movie[]>(
                RECOMMENDATION_URL
            );


        return response.data;

    };