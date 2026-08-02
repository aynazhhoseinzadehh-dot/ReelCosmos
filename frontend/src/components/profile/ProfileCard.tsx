import type { User } from "../../types/user";

interface Props {
    user: User;
}

const AVATAR =
    "https://placehold.co/200x200/1a1a1a/ffffff?text=User";

const ProfileCard = ({ user }: Props) => {
    return (
        <div className="rounded-3xl bg-[#181818] p-8 shadow-xl">

            <div className="flex flex-col items-center">

                <img
                    src={user.profileImageUrl || AVATAR}
                    alt={user.username}
                    className="h-36 w-36 rounded-full object-cover border-4 border-red-600"
                />

                <h2 className="mt-5 text-3xl font-bold">
                    {user.firstName} {user.lastName}
                </h2>

                <p className="mt-2 text-gray-400">
                    @{user.username}
                </p>

                <p className="mt-1 text-gray-500">
                    {user.email}
                </p>

                <span className="mt-5 rounded-full bg-red-600 px-5 py-2 text-sm font-semibold">
          {user.role}
        </span>

                {user.bio && (
                    <p className="mt-6 max-w-xl text-center leading-7 text-gray-300">
                        {user.bio}
                    </p>
                )}

            </div>

        </div>
    );
};

export default ProfileCard;