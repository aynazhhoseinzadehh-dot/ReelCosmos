import {
    FaClock,
    FaCalendar,
    FaGlobe,
    FaLanguage,
    FaStar,
    FaFire,
} from "react-icons/fa";

import type { Movie } from "../../types/movie";

import GenreBadge from "./GenreBadge";

interface Props {
    movie: Movie;
}

const MovieInfo = ({ movie }: Props) => {
    return (
        <div className="space-y-6">

            <div>
                <h1 className="text-5xl font-bold">
                    {movie.title}
                </h1>

                {movie.originalTitle &&
                    movie.originalTitle !== movie.title && (
                        <p className="mt-2 text-xl text-gray-400">
                            {movie.originalTitle}
                        </p>
                    )}
            </div>

            <div className="flex flex-wrap gap-3">
                {movie.genres.map((genre) => (
                    <GenreBadge
                        key={genre.id}
                        name={genre.name}
                    />
                ))}
            </div>

            <p className="leading-8 text-gray-300">
                {movie.overview}
            </p>

            <div className="grid gap-4 md:grid-cols-2">

                <div className="flex items-center gap-3">
                    <FaStar className="text-yellow-400" />
                    <span>
            {movie.averageRating.toFixed(1)}
          </span>
                </div>

                <div className="flex items-center gap-3">
                    <FaFire className="text-red-500" />
                    <span>{movie.popularity}</span>
                </div>

                <div className="flex items-center gap-3">
                    <FaClock className="text-red-500" />
                    <span>{movie.runtime} min</span>
                </div>

                <div className="flex items-center gap-3">
                    <FaCalendar className="text-red-500" />
                    <span>{movie.releaseDate}</span>
                </div>

                <div className="flex items-center gap-3">
                    <FaLanguage className="text-red-500" />
                    <span>{movie.language}</span>
                </div>

                <div className="flex items-center gap-3">
                    <FaGlobe className="text-red-500" />
                    <span>{movie.country}</span>
                </div>

            </div>
        </div>
    );
};

export default MovieInfo;