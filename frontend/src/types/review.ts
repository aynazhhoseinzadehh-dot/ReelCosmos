import type { Movie } from "./movie";
import type { User } from "./user";

export interface Review {

    id: number;

    content: string;

    createdAt: string;

    user: User;

    movie: Movie;

}

export interface ReviewRequest {

    content: string;

}