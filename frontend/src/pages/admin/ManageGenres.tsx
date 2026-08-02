import {
    useEffect,
    useMemo,
    useState,
} from "react";

import toast from "react-hot-toast";

import GenreForm from "../../components/admin/GenreForm";

import {
    getGenres,
    deleteGenre,
} from "../../services/adminGenreService";

import type {
    Genre,
} from "../../types/genre";

const ManageGenres = () => {

    const [genres, setGenres] =
        useState<Genre[]>([]);

    const [selectedGenre, setSelectedGenre] =
        useState<Genre>();

    const [showForm, setShowForm] =
        useState(false);

    const [loading, setLoading] =
        useState(true);

    const [search, setSearch] =
        useState("");

    const [page, setPage] =
        useState(0);

    const [rowsPerPage, setRowsPerPage] =
        useState(10);

    useEffect(() => {

        loadGenres();

    }, []);

    const loadGenres = async () => {

        try {

            setLoading(true);

            const response =
                await getGenres();

            setGenres(response);

        } catch {

            toast.error(
                "Failed to load genres."
            );

        } finally {

            setLoading(false);

        }

    };

    const handleDelete = async (
        id:number
    ) => {

        const confirmDelete =
            window.confirm(
                "Delete this genre?"
            );

        if(!confirmDelete)
            return;

        try{

            await deleteGenre(id);

            toast.success(
                "Genre deleted."
            );

            loadGenres();

        }catch{

            toast.error(
                "Delete failed."
            );

        }

    };

    const handleSuccess = () => {

        setSelectedGenre(undefined);

        setShowForm(false);

        loadGenres();

    };

    const filteredGenres =
        useMemo(()=>{

            const keyword =
                search
                    .trim()
                    .toLowerCase();

            if(!keyword)
                return genres;

            return genres.filter(genre=>

                genre.name
                    .toLowerCase()
                    .includes(keyword)

            );

        },[
            genres,
            search,
        ]);

    const totalPages =
        Math.max(
            1,
            Math.ceil(
                filteredGenres.length /
                rowsPerPage
            )
        );

    const paginatedGenres =
        filteredGenres.slice(

            page * rowsPerPage,

            page * rowsPerPage +
            rowsPerPage

        );

    if (loading) {

        return (

            <div className="p-10 text-white">

                Loading...

            </div>

        );

    }
    return (

        <section className="p-10 text-white">

            <div
                className="
                mb-8
                flex
                items-center
                justify-between
                "
            >

                <h1 className="text-4xl font-bold">
                    Manage Genres
                </h1>

                <button

                    onClick={() => {

                        setSelectedGenre(undefined);

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

                    Add Genre

                </button>

            </div>

            {

                showForm && (

                    <div className="mb-10">

                        <GenreForm

                            genre={selectedGenre}

                            onSuccess={handleSuccess}

                        />

                    </div>

                )

            }

            <div
                className="
                mb-6
                flex
                gap-4
                "
            >

                <input

                    value={search}

                    onChange={(e)=>{

                        setSearch(
                            e.target.value
                        );

                        setPage(0);

                    }}

                    placeholder="Search genres..."

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

                    value={rowsPerPage}

                    onChange={(e)=>{

                        setRowsPerPage(
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
                            Name
                        </th>

                        <th className="p-4 text-left">
                            Actions
                        </th>

                    </tr>

                    </thead>

                    <tbody>

                    {

                        paginatedGenres.map((genre)=>(

                            <tr

                                key={genre.id}

                                className="
                                    border-b
                                    border-gray-800
                                    "

                            >

                                <td className="p-4">

                                    {genre.name}

                                </td>
                                <td
                                    className="
                                        flex
                                        gap-3
                                        p-4
                                        "
                                >

                                    <button

                                        onClick={()=>{

                                            setSelectedGenre(
                                                genre
                                            );

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

                                        onClick={()=>
                                            handleDelete(
                                                genre.id
                                            )
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

                    }

                    </tbody>

                </table>

            </div>

            <div
                className="
                mt-6
                flex
                items-center
                justify-center
                gap-4
                "
            >

                <button

                    disabled={page===0}

                    onClick={()=>
                        setPage(page-1)
                    }

                    className="
                    rounded-lg
                    bg-[#181818]
                    px-4
                    py-2
                    disabled:opacity-50
                    "

                >

                    Previous

                </button>

                <span>

                    Page {page+1} of {totalPages}

                </span>

                <button

                    disabled={
                        page >= totalPages-1
                    }

                    onClick={()=>
                        setPage(page+1)
                    }

                    className="
                    rounded-lg
                    bg-[#181818]
                    px-4
                    py-2
                    disabled:opacity-50
                    "

                >

                    Next

                </button>

            </div>

        </section>

    );

};

export default ManageGenres;