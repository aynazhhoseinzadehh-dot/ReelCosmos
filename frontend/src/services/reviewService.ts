import api from "../api/axios";

import type {
    Review,
    ReviewRequest,
} from "../types/review";

const REVIEWS_URL = "/api/reviews";

export const getMovieReviews = async (
    movieId: number
): Promise<Review[]> => {

    const response = await api.get<Review[]>(
        `${REVIEWS_URL}/movie/${movieId}`
    );

    return response.data;
};

export const getCurrentUserReviews = async (): Promise<Review[]> => {

    const response = await api.get<Review[]>(
        `${REVIEWS_URL}/me`
    );

    return response.data;
};

export const createReview = async (
    movieId: number,
    data: ReviewRequest
): Promise<Review> => {

    const response = await api.post<Review>(
        `${REVIEWS_URL}/movie/${movieId}`,
        data
    );

    return response.data;
};

export const updateReview = async (
    reviewId: number,
    data: ReviewRequest
): Promise<Review> => {

    const response = await api.put<Review>(
        `${REVIEWS_URL}/${reviewId}`,
        data
    );

    return response.data;
};

export const deleteReview = async (
    reviewId: number
): Promise<void> => {

    await api.delete(
        `${REVIEWS_URL}/${reviewId}`
    );
};