import { useEffect, useState } from "react";

import type {
    User,
    UserUpdateRequest,
} from "../../types/user";

import { updateCurrentUser } from "../../services/userService";

import toast from "react-hot-toast";

interface Props {
    user: User;
    onUpdated: (user: User) => void;
}

const ProfileEditForm = ({
                             user,
                             onUpdated,
                         }: Props) => {
    const [loading, setLoading] =
        useState(false);

    const [form, setForm] =
        useState<UserUpdateRequest>({
            firstName: user.firstName,
            lastName: user.lastName,
            bio: user.bio,
            profileImageUrl:
            user.profileImageUrl,
        });

    useEffect(() => {
        setForm({
            firstName: user.firstName,
            lastName: user.lastName,
            bio: user.bio,
            profileImageUrl:
            user.profileImageUrl,
        });
    }, [user]);

    const submit = async (
        e: React.FormEvent
    ) => {
        e.preventDefault();

        try {
            setLoading(true);

            const updated =
                await updateCurrentUser(form);

            onUpdated(updated);

            toast.success(
                "Profile updated successfully."
            );
        } catch {
            toast.error(
                "Update failed."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <form
            onSubmit={submit}
            className="space-y-5 rounded-3xl bg-[#181818] p-8"
        >
            <input
                className="w-full rounded-xl border border-gray-700 bg-[#121212] px-4 py-3"
                value={form.firstName}
                placeholder="First Name"
                onChange={(e) =>
                    setForm({
                        ...form,
                        firstName: e.target.value,
                    })
                }
            />

            <input
                className="w-full rounded-xl border border-gray-700 bg-[#121212] px-4 py-3"
                value={form.lastName}
                placeholder="Last Name"
                onChange={(e) =>
                    setForm({
                        ...form,
                        lastName: e.target.value,
                    })
                }
            />

            <input
                className="w-full rounded-xl border border-gray-700 bg-[#121212] px-4 py-3"
                value={form.profileImageUrl}
                placeholder="Profile Image URL"
                onChange={(e) =>
                    setForm({
                        ...form,
                        profileImageUrl:
                        e.target.value,
                    })
                }
            />

            <textarea
                rows={5}
                className="w-full rounded-xl border border-gray-700 bg-[#121212] px-4 py-3"
                value={form.bio}
                placeholder="Bio"
                onChange={(e) =>
                    setForm({
                        ...form,
                        bio: e.target.value,
                    })
                }
            />

            <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-red-600 py-3 font-semibold transition hover:bg-red-700 disabled:opacity-50"
            >
                {loading
                    ? "Saving..."
                    : "Save Changes"}
            </button>
        </form>
    );
};

export default ProfileEditForm;