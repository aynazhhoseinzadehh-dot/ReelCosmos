import {
    useEffect,
    useState,
} from "react";

import toast from "react-hot-toast";

import MovieForm from "../../components/admin/MovieForm";

import {
    getMovies,
    deleteMovie,
} from "../../services/adminMovieService";

import type {
    Movie,
} from "../../types/movie";

const ManageMovies = () => {

    const [movies, setMovies] =
        useState<Movie[]>([]);

    const [selectedMovie, setSelectedMovie] =
        useState<Movie>();

    const [showForm, setShowForm] =
        useState(false);

    const [loading, setLoading] =
        useState(true);

    const [page, setPage] =
        useState(0);

    const [size, setSize] =
        useState(20);

    const [totalPages, setTotalPages] =
        useState(0);

    const [search, setSearch] =
        useState("");

    useEffect(() => {

        loadMovies();

    }, [page, size, search]);

    const loadMovies = async () => {

        try {

            setLoading(true);

            const response =
                await getMovies(
                    page,
                    size,
                    search
                );

            setMovies(response.content);

            setTotalPages(
                response.totalPages
            );

        } catch {

            toast.error(
                "Failed to load movies."
            );

        } finally {

            setLoading(false);

        }

    };

    const handleDelete = async (
        id: number
    ) => {

        const confirmDelete =
            window.confirm(
                "Delete this movie?"
            );

        if (!confirmDelete) return;

        try {

            await deleteMovie(id);

            toast.success(
                "Movie deleted."
            );

            loadMovies();

        } catch {

            toast.error(
                "Delete failed."
            );

        }

    };

    const handleSuccess = () => {

        setSelectedMovie(undefined);

        setShowForm(false);

        loadMovies();

    };

    const previousPage = () => {

        if (page > 0) {

            setPage(page - 1);

        }

    };

    const nextPage = () => {

        if (page + 1 < totalPages) {

            setPage(page + 1);

        }

    };

    if (loading) {

        return (

            <div className="p-10 text-white">

                Loading...

            </div>

        );

    }

    return (

        <section
            className="
            p-10
            text-white
            "
        >

            <div
                className="
                mb-8
                flex
                items-center
                justify-between
                gap-4
                flex-wrap
                "
            >

                <h1
                    className="
                    text-4xl
                    font-bold
                    "
                >
                    Manage Movies
                </h1>

                <button
                    onClick={() => {

                        setSelectedMovie(undefined);

                        setShowForm(true);

                    }}
                    className="
                    rounded-xl
                    bg-red-600
                    px-6
                    py-3
                    font-semibold
                    hover:bg-red-700
                    "
                >
                    Add Movie
                </button>

            </div>

            <div
                className="
                mb-8
                flex
                gap-4
                flex-wrap
                "
            >

                <input
                    value={search}
                    onChange={(e) => {

                        setSearch(
                            e.target.value
                        );

                        setPage(0);

                    }}
                    placeholder="Search movie..."
                    className="
                    flex-1
                    rounded-xl
                    border
                    border-gray-700
                    bg-[#181818]
                    p-3
                    "
                />

                <select
                    value={size}
                    onChange={(e) => {

                        setSize(
                            Number(
                                e.target.value
                            )
                        );

                        setPage(0);

                    }}
                    className="
                    rounded-xl
                    border
                    border-gray-700
                    bg-[#181818]
                    px-4
                    "
                >

                    <option value={10}>10</option>

                    <option value={20}>20</option>

                    <option value={50}>50</option>

                    <option value={100}>100</option>

                </select>

            </div>

            {
                showForm && (

                    <div className="mb-10">

                        <MovieForm
                            movie={selectedMovie}
                            onSuccess={handleSuccess}
                        />

                    </div>

                )
            }
            <div
                className="
                overflow-hidden
                rounded-2xl
                bg-[#181818]
                "
            >

                <table className="w-full">

                    <thead
                        className="
                        border-b
                        border-gray-700
                        "
                    >

                    <tr>

                        <th className="p-4 text-left">
                            Title
                        </th>

                        <th className="p-4 text-left">
                            Year
                        </th>

                        <th className="p-4 text-left">
                            Rating
                        </th>

                        <th className="p-4 text-left">
                            Actions
                        </th>

                    </tr>

                    </thead>

                    <tbody>

                    {
                        movies.length === 0 ? (

                            <tr>

                                <td
                                    colSpan={4}
                                    className="
                                        p-8
                                        text-center
                                        text-gray-400
                                        "
                                >

                                    No movies found.

                                </td>

                            </tr>

                        ) : (

                            movies.map(movie => (

                                <tr
                                    key={movie.id}
                                    className="
                                        border-b
                                        border-gray-800
                                        "
                                >

                                    <td className="p-4">

                                        {movie.title}

                                    </td>

                                    <td className="p-4">

                                        {
                                            movie.releaseDate
                                                ? new Date(
                                                    movie.releaseDate
                                                ).getFullYear()
                                                : "-"
                                        }

                                    </td>

                                    <td className="p-4">

                                        {
                                            movie.averageRating
                                                ?.toFixed(1)
                                            ?? "0.0"
                                        }

                                    </td>

                                    <td
                                        className="
                                            flex
                                            gap-3
                                            p-4
                                            "
                                    >

                                        <button

                                            onClick={() => {

                                                setSelectedMovie(movie);

                                                setShowForm(true);

                                            }}

                                            className="
                                                rounded-lg
                                                bg-blue-600
                                                px-4
                                                py-2
                                                hover:bg-blue-700
                                                "
                                        >

                                            Edit

                                        </button>

                                        <button

                                            onClick={() =>
                                                handleDelete(movie.id)
                                            }

                                            className="
                                                rounded-lg
                                                bg-red-600
                                                px-4
                                                py-2
                                                hover:bg-red-700
                                                "
                                        >

                                            Delete

                                        </button>

                                    </td>

                                </tr>

                            ))

                        )
                    }

                    </tbody>

                </table>

            </div>

            <div
                className="
                mt-8
                flex
                items-center
                justify-between
                "
            >

                <button

                    onClick={previousPage}

                    disabled={page === 0}

                    className="
                    rounded-lg
                    bg-gray-700
                    px-5
                    py-2
                    disabled:opacity-40
                    "
                >

                    Previous

                </button>

                <span
                    className="
                    text-gray-300
                    "
                >

                    Page {page + 1} of {Math.max(totalPages, 1)}

                </span>

                <button

                    onClick={nextPage}

                    disabled={page + 1 >= totalPages}

                    className="
                    rounded-lg
                    bg-gray-700
                    px-5
                    py-2
                    disabled:opacity-40
                    "
                >

                    Next

                </button>

            </div>

        </section>

    );

};

export default ManageMovies;