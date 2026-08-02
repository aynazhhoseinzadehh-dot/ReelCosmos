import { useEffect, useState } from "react";

import ProfileCard from "../components/profile/ProfileCard";
import ProfileEditForm from "../components/profile/ProfileEditForm";

import { getCurrentUser } from "../services/userService";

import type { User } from "../types/user";

const Profile = () => {
    const [user, setUser] =
        useState<User>();

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {
        loadUser();
    }, []);

    const loadUser = async () => {
        try {
            const response =
                await getCurrentUser();

            setUser(response);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="mx-auto max-w-7xl px-6 py-20">
                Loading...
            </div>
        );
    }

    if (!user) {
        return (
            <div className="mx-auto max-w-7xl px-6 py-20">
                User not found.
            </div>
        );
    }

    return (
        <section className="mx-auto max-w-7xl space-y-10 px-6 py-10">

            <ProfileCard user={user} />

            <ProfileEditForm
                user={user}
                onUpdated={setUser}
            />

        </section>
    );
};

export default Profile;