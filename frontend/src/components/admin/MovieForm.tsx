import {
    useEffect,
    useState,
} from "react";

import toast from "react-hot-toast";

import {
    createMovie,
    updateMovie,
} from "../../services/adminMovieService";

import {
    getGenres,
} from "../../services/genreService";

import {
    getActors,
} from "../../services/actorService";

import type {
    Movie,
    MovieRequest,
} from "../../types/movie";

import type {
    Genre,
} from "../../types/genre";

import type {
    Actor,
} from "../../types/actor";

interface Props {

    movie?: Movie;

    onSuccess: () => void;

}

const emptyMovie: MovieRequest = {

    tmdbId: 0,

    title: "",

    originalTitle: "",

    overview: "",

    releaseDate: "",

    runtime: 0,

    language: "",

    country: "",

    posterUrl: "",

    backdropUrl: "",

    trailerUrl: "",

    status: "RELEASED",

    genreIds: [],

    actorIds: [],

};

const MovieForm = ({
                       movie,
                       onSuccess,
                   }: Props) => {

    const [loading, setLoading] =
        useState(false);

    const [genres, setGenres] =
        useState<Genre[]>([]);

    const [actors, setActors] =
        useState<Actor[]>([]);

    const [form, setForm] =
        useState<MovieRequest>(emptyMovie);

    useEffect(() => {

        loadLists();

    }, []);

    useEffect(() => {

        if (!movie) {

            setForm(emptyMovie);

            return;

        }

        setForm({

            tmdbId: movie.tmdbId,

            title: movie.title,

            originalTitle:
                movie.originalTitle ?? "",

            overview:
                movie.overview ?? "",

            releaseDate:
                movie.releaseDate ?? "",

            runtime:
                movie.runtime ?? 0,

            language:
                movie.language ?? "",

            country:
                movie.country ?? "",

            posterUrl:
                movie.posterUrl ?? "",

            backdropUrl:
                movie.backdropUrl ?? "",

            trailerUrl:
                movie.trailerUrl ?? "",

            status:
            movie.status,

            genreIds:
                movie.genres.map(
                    genre => genre.id
                ),

            actorIds:
                movie.cast.map(
                    cast => cast.actor.id
                ),

        });

    }, [movie]);

    const loadLists = async () => {

        try {

            const [
                genresResponse,
                actorsResponse,
            ] = await Promise.all([

                getGenres(),

                getActors(),

            ]);

            setGenres(genresResponse);

            setActors(actorsResponse);

        } catch {

            toast.error(
                "Failed to load genres and actors."
            );

        }

    };

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement |
            HTMLTextAreaElement |
            HTMLSelectElement
        >
    ) => {

        const {
            name,
            value,
        } = e.target;

        setForm(prev => ({

            ...prev,

            [name]:
                name === "tmdbId" ||
                name === "runtime"
                    ? Number(value)
                    : value,

        }));

    };

    const handleGenresChange = (
        e: React.ChangeEvent<HTMLSelectElement>
    ) => {

        setForm(prev => ({

            ...prev,

            genreIds: Array.from(
                e.target.selectedOptions
            ).map(option =>
                Number(option.value)
            ),

        }));

    };

    const handleActorsChange = (
        e: React.ChangeEvent<HTMLSelectElement>
    ) => {

        setForm(prev => ({

            ...prev,

            actorIds: Array.from(
                e.target.selectedOptions
            ).map(option =>
                Number(option.value)
            ),

        }));

    };

    const submitHandler = async (
        e: React.FormEvent
    ) => {

        e.preventDefault();

        if (!form.title.trim()) {

            toast.error("Title is required.");

            return;

        }

        if((form.genreIds ??[]).length === 0) {

            toast.error(
                "Select at least one genre."
            );

            return;

        }

        if ((form.actorIds ??[]).length === 0) {

            toast.error(
                "Select at least one actor."
            );

            return;

        }

        try {

            setLoading(true);

            if (movie) {

                await updateMovie(
                    movie.id,
                    form
                );

                toast.success(
                    "Movie updated successfully."
                );

            } else {

                await createMovie(form);

                toast.success(
                    "Movie created successfully."
                );

                setForm(emptyMovie);

            }

            onSuccess();

        } catch {

            toast.error(
                "Operation failed."
            );

        } finally {

            setLoading(false);

        }

    };
    return (

        <form
            onSubmit={submitHandler}
            className="
            space-y-6
            rounded-2xl
            bg-[#181818]
            p-6
        "
        >

            <input
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Title"
                required
                className="w-full rounded-xl border border-gray-700 bg-[#121212] p-3"
            />

            <input
                name="originalTitle"
                value={form.originalTitle}
                onChange={handleChange}
                placeholder="Original Title"
                className="w-full rounded-xl border border-gray-700 bg-[#121212] p-3"
            />

            <textarea
                name="overview"
                value={form.overview}
                onChange={handleChange}
                rows={5}
                placeholder="Overview"
                className="w-full rounded-xl border border-gray-700 bg-[#121212] p-3"
            />

            <div className="grid gap-4 md:grid-cols-2">

                <input
                    name="tmdbId"
                    type="number"
                    value={form.tmdbId}
                    onChange={handleChange}
                    placeholder="TMDB ID"
                    className="rounded-xl border border-gray-700 bg-[#121212] p-3"
                />

                <input
                    name="runtime"
                    type="number"
                    value={form.runtime}
                    onChange={handleChange}
                    placeholder="Runtime (minutes)"
                    className="rounded-xl border border-gray-700 bg-[#121212] p-3"
                />

            </div>

            <div className="grid gap-4 md:grid-cols-2">

                <input
                    name="releaseDate"
                    type="date"
                    value={form.releaseDate}
                    onChange={handleChange}
                    className="rounded-xl border border-gray-700 bg-[#121212] p-3"
                />

                <select
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                    className="rounded-xl border border-gray-700 bg-[#121212] p-3"
                >

                    <option value="RELEASED">
                        RELEASED
                    </option>

                    <option value="UPCOMING">
                        UPCOMING
                    </option>

                    <option value="CANCELED">
                        CANCELED
                    </option>

                </select>

            </div>

            <div className="grid gap-4 md:grid-cols-2">

                <input
                    name="language"
                    value={form.language}
                    onChange={handleChange}
                    placeholder="Language"
                    className="rounded-xl border border-gray-700 bg-[#121212] p-3"
                />

                <input
                    name="country"
                    value={form.country}
                    onChange={handleChange}
                    placeholder="Country"
                    className="rounded-xl border border-gray-700 bg-[#121212] p-3"
                />

            </div>

            <input
                name="posterUrl"
                type="url"
                value={form.posterUrl}
                onChange={handleChange}
                placeholder="Poster URL"
                className="w-full rounded-xl border border-gray-700 bg-[#121212] p-3"
            />

            <input
                name="backdropUrl"
                type="url"
                value={form.backdropUrl}
                onChange={handleChange}
                placeholder="Backdrop URL"
                className="w-full rounded-xl border border-gray-700 bg-[#121212] p-3"
            />

            <input
                name="trailerUrl"
                type="url"
                value={form.trailerUrl}
                onChange={handleChange}
                placeholder="Trailer URL"
                className="w-full rounded-xl border border-gray-700 bg-[#121212] p-3"
            />

            <div>

                <label className="mb-2 block font-semibold">
                    Genres
                </label>

                <p className="mb-2 text-sm text-gray-400">
                    Hold Ctrl (Windows) or Cmd (Mac) to select multiple genres.
                </p>

                <select
                    multiple
                    value={(form.genreIds ??[]).map(String)}
                    onChange={handleGenresChange}
                    className="h-44 w-full rounded-xl border border-gray-700 bg-[#121212] p-3"
                >

                    {genres.map((genre) => (

                        <option
                            key={genre.id}
                            value={genre.id}
                        >

                            {genre.name}

                        </option>

                    ))}

                </select>

            </div>

            <div>

                <label className="mb-2 block font-semibold">
                    Actors
                </label>

                <p className="mb-2 text-sm text-gray-400">
                    Hold Ctrl (Windows) or Cmd (Mac) to select multiple actors.
                </p>

                <select
                    multiple
                    value={(form.actorIds ??[]).map(String)}
                    onChange={handleActorsChange}
                    className="h-64 w-full rounded-xl border border-gray-700 bg-[#121212] p-3"
                >

                    {actors.map((actor) => (

                        <option
                            key={actor.id}
                            value={actor.id}
                        >

                            {actor.name}

                        </option>

                    ))}

                </select>

            </div>

            <button
                type="submit"
                disabled={loading}
                className="
                w-full
                rounded-xl
                bg-red-600
                py-3
                font-bold
                transition
                hover:bg-red-700
                disabled:cursor-not-allowed
                disabled:opacity-50
            "
            >

                {loading
                    ? "Saving..."
                    : movie
                        ? "Update Movie"
                        : "Create Movie"}

            </button>

        </form>

    );

};

export default MovieForm;