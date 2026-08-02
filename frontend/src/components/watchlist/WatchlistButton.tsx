import { useState } from "react";
import { FaBookmark } from "react-icons/fa";
import toast from "react-hot-toast";

import { useWatchlist } from "../../hooks/useWatchlist";

interface Props {
    movieId: number;
}

const WatchlistButton = ({
                             movieId,
                         }: Props) => {

    const {
        isInWatchlist,
        toggleWatchlist,
    } = useWatchlist();

    const [loading, setLoading] =
        useState(false);

    const inWatchlist =
        isInWatchlist(movieId);

    const handleClick = async (
        e: React.MouseEvent
    ) => {

        e.preventDefault();
        e.stopPropagation();

        try {

            setLoading(true);

            const wasInWatchlist =
                inWatchlist;

            await toggleWatchlist(movieId);

            toast.success(
                wasInWatchlist
                    ? "Removed from watchlist"
                    : "Added to watchlist"
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
                left-3
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
            <FaBookmark
                className={
                    inWatchlist
                        ? "text-blue-500"
                        : "text-white"
                }
            />
        </button>
    );
};

export default WatchlistButton;