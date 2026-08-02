import api from "../api/axios";

import type { Review } from "../types/review";

const REVIEWS_URL = "/api/reviews";

export const getReviews =
    async (): Promise<Review[]> => {

        const response =
            await api.get<Review[]>(
                REVIEWS_URL
            );

        return response.data;

    };

export const deleteReview =
    async (
        id: number
    ): Promise<void> => {

        await api.delete(
            `${REVIEWS_URL}/admin/${id}`
        );

    };