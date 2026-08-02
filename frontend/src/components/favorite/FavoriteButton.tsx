import { useState } from "react";
import { FaHeart } from "react-icons/fa";
import toast from "react-hot-toast";

import { useFavorite } from "../../hooks/useFavorite";

interface Props {
    movieId: number;
}

const FavoriteButton = ({
                            movieId,
                        }: Props) => {

    const {
        isFavorite,
        toggleFavorite,
    } = useFavorite();

    const [loading, setLoading] =
        useState(false);

    const favorite =
        isFavorite(movieId);

    const handleClick = async (
        e: React.MouseEvent
    ) => {

        e.preventDefault();
        e.stopPropagation();

        try {

            setLoading(true);

            const wasFavorite = favorite;

            await toggleFavorite(movieId);

            toast.success(
                wasFavorite
                    ? "Removed from favorites"
                    : "Added to favorites"
            );

        } catch {

            toast.error(
                "Something went wrong."
            );

        } finally {

            setLoading(false);

        }

    };

    return (
        <button
            onClick={handleClick}
            disabled={loading}
            className="
                absolute
                right-3
                top-3
                z-10
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-full
                bg-black/70
                transition
                hover:scale-110
                disabled:opacity-50
            "
        >
            <FaHeart
                className={
                    favorite
                        ? "text-red-600"
                        : "text-white"
                }
            />
        </button>
    );
};

export default FavoriteButton;