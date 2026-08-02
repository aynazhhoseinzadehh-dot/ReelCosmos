import {
    useEffect,
    useState,
} from "react";

import toast from "react-hot-toast";

import ActorForm from "../../components/admin/ActorForm";

import {
    getActors,
    deleteActor,
} from "../../services/adminActorService";

import type {
    Actor,
    ActorPage,
} from "../../types/actor";

const ManageActors = () => {

    const [actorPage, setActorPage] =
        useState<ActorPage>();

    const [selectedActor, setSelectedActor] =
        useState<Actor>();

    const [showForm, setShowForm] =
        useState(false);

    const [loading, setLoading] =
        useState(true);

    const [search, setSearch] =
        useState("");

    const [page, setPage] =
        useState(0);

    const [size, setSize] =
        useState(10);

    useEffect(() => {

        loadActors();

    }, [
        page,
        size,
        search,
    ]);

    const loadActors = async () => {

        try {

            const response =
                await getActors({

                    page,

                    size,

                    name: search,

                });

            setActorPage(response);

        } catch {

            toast.error(
                "Failed to load actors."
            );

        } finally {

            setLoading(false);

        }

    };

    const handleDelete = async (
        id: number
    ) => {

        if (
            !window.confirm(
                "Delete this actor?"
            )
        ) {
            return;
        }

        try {

            await deleteActor(id);

            toast.success(
                "Actor deleted."
            );

            loadActors();

        } catch {

            toast.error(
                "Delete failed."
            );

        }

    };

    const handleSuccess = () => {

        setSelectedActor(undefined);

        setShowForm(false);

        loadActors();

    };

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

                    Manage Actors

                </h1>

                <button

                    onClick={() => {

                        setSelectedActor(undefined);

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

                    Add Actor

                </button>

            </div>

            <div
                className="
                mb-6
                flex
                flex-wrap
                items-center
                gap-4
                "
            >

                <input

                    type="text"

                    placeholder="Search actor..."

                    value={search}

                    onChange={(e) => {

                        setSearch(
                            e.target.value
                        );

                        setPage(0);

                    }}

                    className="
                    w-72
                    rounded-xl
                    border
                    border-gray-700
                    bg-[#181818]
                    px-4
                    py-3
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
                    py-3
                    "
                >

                    <option value={5}>5</option>

                    <option value={10}>10</option>

                    <option value={20}>20</option>

                    <option value={50}>50</option>

                </select>

                <div className="ml-auto text-gray-400">

                    Total Actors:

                    <span className="ml-2 font-bold text-white">

                        {actorPage?.totalElements ?? 0}

                    </span>

                </div>

            </div>

            {showForm && (

                <div className="mb-10">

                    <ActorForm

                        actor={selectedActor}

                        onSuccess={handleSuccess}

                    />

                </div>

            )}
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
                            Birthday
                        </th>

                        <th className="p-4 text-left">
                            Actions
                        </th>

                    </tr>

                    </thead>

                    <tbody>

                    {actorPage?.content.map((actor) => (

                        <tr
                            key={actor.id}
                            className="
                            border-b
                            border-gray-800
                            "
                        >

                            <td className="p-4">

                                {actor.name}

                            </td>

                            <td className="p-4">

                                {actor.birthday || "-"}

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

                                        setSelectedActor(actor);

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
                                        handleDelete(actor.id)
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

                    ))}

                    </tbody>

                </table>

            </div>

            <div
                className="
                mt-6
                flex
                items-center
                justify-between
                "
            >

                <button

                    disabled={page === 0}

                    onClick={() =>
                        setPage(page - 1)
                    }

                    className="
                    rounded-lg
                    bg-[#181818]
                    px-5
                    py-2
                    disabled:opacity-40
                    "
                >

                    Previous

                </button>

                <span>

                    Page

                    {" "}

                    <strong>

                        {page + 1}

                    </strong>

                    {" / "}

                    <strong>

                        {actorPage?.totalPages ?? 1}

                    </strong>

                </span>

                <button

                    disabled={
                        page >=
                        (actorPage?.totalPages ?? 1) - 1
                    }

                    onClick={() =>
                        setPage(page + 1)
                    }

                    className="
                    rounded-lg
                    bg-[#181818]
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

export default ManageActors;