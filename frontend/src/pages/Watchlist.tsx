import { useEffect, useState } from "react";

import MovieGrid from "../components/movie/MovieGrid";

import { getWatchlist } from "../services/watchlistService";

import type { Movie } from "../types/movie";

const Watchlist = () => {

    const [movies, setMovies] =
        useState<Movie[]>([]);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {
        loadWatchlist();
    }, []);

    const loadWatchlist =
        async () => {

            try {

                const response =
                    await getWatchlist();

                setMovies(response);

            } finally {

                setLoading(false);

            }

        };

    if (loading) {
        return (
            <div className="mx-auto max-w-7xl px-6 py-20">
                Loading...
            </div>
        );
    }

    return (
        <section className="mx-auto max-w-7xl px-6 py-10">

            <h1 className="mb-8 text-4xl font-bold">
                My Watchlist
            </h1>

            {movies.length === 0 ? (

                <div className="rounded-2xl bg-[#181818] p-10 text-center text-gray-400">
                    Your watchlist is empty.
                </div>

            ) : (

                <MovieGrid movies={movies} />

            )}

        </section>
    );
};

export default Watchlist;