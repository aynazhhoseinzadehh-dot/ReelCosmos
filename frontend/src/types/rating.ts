import type { Movie } from "./movie";
import type { User } from "./user";

export interface Rating {
    id: number;

    score: number;

    user: User;

    movie: Movie;
}


export interface RatingRequest {
    score: number;
}