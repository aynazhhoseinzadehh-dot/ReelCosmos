import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getMovieById } from "../services/movieService";

import type { Movie } from "../types/movie";

import MovieHero from "../components/movie/MovieHero";
import MovieInfo from "../components/movie/MovieInfo";
import CastSection from "../components/movie/CastSection";

import RatingBox from "../components/rating/RatingBox";
import RatingList from "../components/rating/RatingList";
import WatchedButton from "../components/movie/WatchedButton";
import ReviewSection from "../components/review/ReviewSection";
import FavoriteButton from "../components/favorite/FavoriteButton";
import WatchlistButton from "../components/watchlist/WatchlistButton";
import MovieSkeleton from "../components/movie/MovieSkeleton";
const MovieDetails = () =>
{
    const { id } = useParams();

    const [movie, setMovie] =
        useState<Movie>();

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {

        if (id) {
            loadMovie(Number(id));
        }

    }, [id]);

    const loadMovie = async (
        movieId: number
    ) => {

        try {

            const response =
                await getMovieById(movieId);

            setMovie(response);

        } finally {

            setLoading(false);

        }

    };

    if (loading) {

        return (

            <section
                className="
            min-h-screen
            bg-[#121212]
            px-6
            py-10
            "
            >

                <div
                    className="
                mx-auto
                max-w-7xl
                "
                >

                    <MovieSkeleton />

                </div>

            </section>

        );

    }

    if (!movie) {

        return (
            <div className="mx-auto max-w-7xl px-6 py-20">
                Movie not found.
            </div>
        );

    }

    return (

        <section
            className="
                mx-auto
                max-w-7xl
                space-y-12
                px-6
                py-10
            "
        >

            <MovieHero
                movie={movie}
            />

            <MovieInfo
                movie={movie}
            />


            <WatchedButton
                movieId={movie.id}
            />


            <FavoriteButton
                movieId={movie.id}
            />

            <WatchlistButton
                movieId={movie.id}
            />

            <CastSection
                cast={movie.cast}
            />

            {/* Ratings */}

            <RatingBox
                movieId={movie.id}
            />

            <RatingList
                movieId={movie.id}
            />

            {/* Reviews */}

            <ReviewSection
                movieId={movie.id}
            />

        </section>

    );

};

export default MovieDetails;