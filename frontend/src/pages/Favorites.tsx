import { useEffect, useState } from "react";

import MovieGrid from "../components/movie/MovieGrid";
import MovieSkeleton from "../components/movie/MovieSkeleton";

import { getFavorites } from "../services/favoriteService";

import type { Movie } from "../types/movie";

const Favorites = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadFavorites();
    }, []);

    const loadFavorites = async () => {
        try {
            const response = await getFavorites();
            setMovies(response);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="mx-auto max-w-7xl px-6 py-10">
            <h1 className="mb-8 text-4xl font-bold">
                My Favorites
            </h1>

            {loading ? (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                    {Array.from({ length: 10 }).map((_, index) => (
                        <MovieSkeleton key={index} />
                    ))}
                </div>
            ) : movies.length === 0 ? (
                <div className="rounded-2xl bg-[#181818] p-10 text-center text-gray-400">
                    You don't have any favorite movies yet.
                </div>
            ) : (
                <MovieGrid movies={movies} />
            )}
        </section>
    );
};

export default Favorites;