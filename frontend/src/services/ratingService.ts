import api from "../api/axios";

import type {
    Rating,
    RatingRequest,
} from "../types/rating";


const RATINGS_URL = "/api/ratings";


// Create Rating

export const createRating = async (
    movieId: number,
    data: RatingRequest
): Promise<Rating> => {

    const response =
        await api.post<Rating>(
            `${RATINGS_URL}/movie/${movieId}`,
            data
        );

    return response.data;
};



// Update Rating

export const updateRating = async (
    ratingId: number,
    data: RatingRequest
): Promise<Rating> => {

    const response =
        await api.put<Rating>(
            `${RATINGS_URL}/${ratingId}`,
            data
        );

    return response.data;
};



// Delete Rating

export const deleteRating = async (
    ratingId: number
): Promise<void> => {

    await api.delete(
        `${RATINGS_URL}/${ratingId}`
    );

};



// Get Movie Ratings

export const getMovieRatings = async (
    movieId: number
): Promise<Rating[]> => {

    const response =
        await api.get<Rating[]>(
            `${RATINGS_URL}/movie/${movieId}`
        );

    return response.data;
};



// Get Current User Ratings

export const getMyRatings = async ()
    : Promise<Rating[]> => {

    const response =
        await api.get<Rating[]>(
            `${RATINGS_URL}/me`
        );

    return response.data;
};