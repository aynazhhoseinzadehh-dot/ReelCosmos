import type { Movie } from "../../types/movie";

interface Props {
    movie: Movie;
}

const POSTER_PLACEHOLDER =
    "https://placehold.co/500x750/1a1a1a/ffffff?text=No+Poster";

const MovieHero = ({ movie }: Props) => {
    return (
        <section className="relative overflow-hidden rounded-3xl">

            {movie.backdropUrl && (
                <img
                    src={movie.backdropUrl}
                    alt={movie.title}
                    className="absolute inset-0 h-full w-full object-cover"
                />
            )}

            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

            <div className="relative flex flex-col gap-8 p-8 md:flex-row">

                <img
                    src={movie.posterUrl || POSTER_PLACEHOLDER}
                    alt={movie.title}
                    className="w-full max-w-xs rounded-2xl shadow-2xl"
                />

                <div className="flex flex-1 flex-col justify-center">

                    <h1 className="text-5xl font-bold">
                        {movie.title}
                    </h1>

                    {movie.originalTitle &&
                        movie.originalTitle !== movie.title && (
                            <p className="mt-3 text-xl text-gray-300">
                                {movie.originalTitle}
                            </p>
                        )}

                    <p className="mt-8 leading-8 text-gray-200">
                        {movie.overview}
                    </p>

                    <div className="mt-8 flex flex-wrap gap-4">

                        <button
                            className="
              rounded-xl
              bg-red-600
              px-6
              py-3
              font-semibold
              transition
              hover:bg-red-700
            "
                        >
                            Add to Watchlist
                        </button>

                        <button
                            className="
              rounded-xl
              border
              border-gray-600
              px-6
              py-3
              font-semibold
              transition
              hover:border-red-500
            "
                        >
                            Add to Favorites
                        </button>

                    </div>

                </div>

            </div>

        </section>
    );
};

export default MovieHero;