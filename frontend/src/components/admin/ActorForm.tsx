import {
    useEffect,
    useState,
} from "react";

import toast from "react-hot-toast";

import {
    createActor,
    updateActor,
} from "../../services/adminActorService";

import type { Actor } from "../../types/actor";

interface Props {

    actor?: Actor;

    onSuccess: () => void;

}

const ActorForm = ({
                       actor,
                       onSuccess,
                   }: Props) => {

    const [loading, setLoading] =
        useState(false);

    const [form, setForm] =
        useState<Omit<Actor, "id">>({

            tmdbId: 0,

            name: "",

            biography: "",

            birthday: "",

            placeOfBirth: "",

            profileImageUrl: "",

        });

    useEffect(() => {

        if (actor) {

            setForm({

                tmdbId: actor.tmdbId,

                name: actor.name,

                biography: actor.biography,

                birthday: actor.birthday,

                placeOfBirth: actor.placeOfBirth,

                profileImageUrl: actor.profileImageUrl,

            });

        }

    }, [actor]);

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement |
            HTMLTextAreaElement
        >
    ) => {

        const {
            name,
            value,
        } = e.target;

        setForm(prev => ({

            ...prev,

            [name]:
                name === "tmdbId"
                    ? Number(value)
                    : value,

        }));

    };

    const submitHandler = async (
        e: React.FormEvent
    ) => {

        e.preventDefault();

        try {

            setLoading(true);

            if (actor) {

                await updateActor(
                    actor.id,
                    form
                );

                toast.success(
                    "Actor updated."
                );

            } else {

                await createActor(form);

                toast.success(
                    "Actor created."
                );

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
            className="space-y-5 rounded-2xl bg-[#181818] p-6"
        >

            <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Actor name"
                className="input"
            />

            <input
                name="tmdbId"
                value={form.tmdbId}
                onChange={handleChange}
                placeholder="TMDB ID"
                className="input"
            />

            <textarea
                name="biography"
                value={form.biography}
                onChange={handleChange}
                placeholder="Biography"
                className="input"
            />

            <input
                name="birthday"
                value={form.birthday}
                onChange={handleChange}
                placeholder="Birthday"
                className="input"
            />

            <input
                name="placeOfBirth"
                value={form.placeOfBirth}
                onChange={handleChange}
                placeholder="Place of birth"
                className="input"
            />

            <input
                name="profileImageUrl"
                value={form.profileImageUrl}
                onChange={handleChange}
                placeholder="Profile image URL"
                className="input"
            />

            <button
                disabled={loading}
                className="w-full rounded-xl bg-red-600 py-3 font-bold hover:bg-red-700"
            >

                {
                    loading
                        ? "Saving..."
                        : actor
                            ? "Update Actor"
                            : "Create Actor"
                }

            </button>

        </form>

    );

};

export default ActorForm;