import type { Movie } from "./movie";


export interface WatchedMovie {

    id: number;

    movie: Movie;

    watchedAt: string;

    rewatchCount: number;

    lastWatched: string;

}