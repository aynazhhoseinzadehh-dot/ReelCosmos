import { Link } from "react-router-dom";
import { FaStar, FaClock } from "react-icons/fa";


import type { Movie } from "../../types/movie";

interface Props {
    movie: Movie;
}

const PLACEHOLDER =
    "https://placehold.co/500x750/1a1a1a/ffffff?text=No+Poster";

const MovieCard = ({ movie }: Props) => {
    return (
        <Link
            to={`/movies/${movie.id}`}
            className="group overflow-hidden rounded-2xl bg-[#181818] transition duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-red-600/20"
        >
            <div className="relative aspect-[2/3] overflow-hidden">






                <img
                    src={movie.posterUrl || PLACEHOLDER}
                    alt={movie.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />

            </div>

            <div className="space-y-3 p-4">

                <h3 className="line-clamp-1 text-lg font-semibold">
                    {movie.title}
                </h3>

                <div className="flex items-center justify-between text-sm text-gray-400">

                    <span>
                        {movie.releaseDate
                            ? new Date(movie.releaseDate).getFullYear()
                            : "-"}
                    </span>

                    <div className="flex items-center gap-1">
                        <FaClock className="text-red-500" />

                        <span>
                            {movie.runtime ?? "-"} min
                        </span>
                    </div>

                </div>

                <div className="flex items-center justify-between">

                    <span className="rounded-full bg-red-600 px-3 py-1 text-xs font-medium">
                        {movie.status}
                    </span>

                    <div className="flex items-center gap-1">
                        <FaStar className="text-yellow-400" />

                        <span className="font-semibold">
                            {movie.averageRating?.toFixed(1) ?? "0.0"}
                        </span>
                    </div>

                </div>

            </div>

        </Link>
    );
};

export default MovieCard;