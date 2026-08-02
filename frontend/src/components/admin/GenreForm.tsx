import {
    useEffect,
    useState,
} from "react";

import toast from "react-hot-toast";

import {
    createGenre,
    updateGenre,
} from "../../services/adminGenreService";

import type {
    Genre,
} from "../../types/genre";

interface Props {

    genre?: Genre;

    onSuccess: () => void;

}

const GenreForm = ({
                       genre,
                       onSuccess,
                   }: Props) => {

    const [loading, setLoading] =
        useState(false);

    const [name, setName] =
        useState("");

    useEffect(() => {

        if (genre) {

            setName(genre.name);

        } else {

            setName("");

        }

    }, [genre]);

    const submitHandler = async (
        e: React.FormEvent
    ) => {

        e.preventDefault();

        try {

            setLoading(true);

            if (genre) {

                await updateGenre(
                    genre.id,
                    {
                        name,
                    }
                );

                toast.success(
                    "Genre updated."
                );

            } else {

                await createGenre({
                    name,
                });

                toast.success(
                    "Genre created."
                );

                setName("");

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
            space-y-5
            rounded-2xl
            bg-[#181818]
            p-6
            "
        >

            <input
                value={name}
                onChange={(e) =>
                    setName(e.target.value)
                }
                placeholder="Genre name"
                className="
                w-full
                rounded-xl
                border
                border-gray-700
                bg-[#121212]
                p-3
                "
            />

            <button
                disabled={loading}
                className="
                w-full
                rounded-xl
                bg-red-600
                py-3
                font-bold
                hover:bg-red-700
                disabled:opacity-50
                "
            >

                {
                    loading
                        ? "Saving..."
                        : genre
                            ? "Update Genre"
                            : "Create Genre"
                }

            </button>

        </form>

    );

};

export default GenreForm;