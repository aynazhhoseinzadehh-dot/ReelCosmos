import { useEffect, useState } from "react";

import { getMovies } from "../services/movieService";

import type { Movie } from "../types/movie";

import MovieGrid from "../components/movie/MovieGrid";
import MovieSkeleton from "../components/movie/MovieSkeleton";

const Movies = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        loadMovies();
    }, []);

    const loadMovies = async () => {
        try {
            setLoading(true);

            const response = await getMovies();

            setMovies(response.content);
        } catch (err) {
            setError("Failed to load movies.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="mx-auto max-w-7xl px-6 py-10">
            <div className="mb-10">
                <h1 className="text-4xl font-bold">
                    Movies
                </h1>

                <p className="mt-2 text-gray-400">
                    Discover, rate and organize your favorite movies.
                </p>
            </div>

            {loading && (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                    {Array.from({ length: 10 }).map((_, index) => (
                        <MovieSkeleton key={index} />
                    ))}
                </div>
            )}

            {!loading && error && (
                <div className="rounded-xl border border-red-500 bg-red-500/10 p-8 text-center">
                    <h2 className="text-xl font-semibold text-red-400">
                        {error}
                    </h2>
                </div>
            )}

            {!loading && !error && movies.length === 0 && (
                <div className="rounded-xl border border-gray-700 bg-[#181818] p-10 text-center">
                    <h2 className="text-2xl font-semibold">
                        No movies found
                    </h2>

                    <p className="mt-3 text-gray-400">
                        Your database is currently empty.
                    </p>
                </div>
            )}

            {!loading && !error && movies.length > 0 && (
                <MovieGrid movies={movies} />
            )}
        </section>
    );
};

export default Movies;