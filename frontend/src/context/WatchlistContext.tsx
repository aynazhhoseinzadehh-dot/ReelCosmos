import {
    createContext,
    useEffect,
    useState,
    type ReactNode,
} from "react";

import { useAuth } from "../hooks/useAuth";

import {
    getWatchlist,
    addToWatchlist,
    removeFromWatchlist,
} from "../services/watchlistService";

interface WatchlistContextType {
    watchlist: number[];

    isInWatchlist: (
        movieId: number
    ) => boolean;

    toggleWatchlist: (
        movieId: number
    ) => Promise<void>;

    reloadWatchlist: () => Promise<void>;
}

export const WatchlistContext =
    createContext(
        {} as WatchlistContextType
    );

interface Props {
    children: ReactNode;
}

export const WatchlistProvider = ({
                                      children,
                                  }: Props) => {

    const { isAuthenticated } =
        useAuth();

    const [watchlist, setWatchlist] =
        useState<number[]>([]);

    useEffect(() => {

        if (isAuthenticated) {

            reloadWatchlist();

        } else {

            setWatchlist([]);

        }

    }, [isAuthenticated]);

    const reloadWatchlist =
        async () => {

            try {

                const movies =
                    await getWatchlist();

                setWatchlist(
                    movies.map(
                        (movie) => movie.id
                    )
                );

            } catch {

                setWatchlist([]);

            }

        };

    const isInWatchlist = (
        movieId: number
    ) =>
        watchlist.includes(movieId);

    const toggleWatchlist =
        async (
            movieId: number
        ) => {

            if (
                watchlist.includes(movieId)
            ) {

                await removeFromWatchlist(
                    movieId
                );

                setWatchlist(
                    (prev) =>
                        prev.filter(
                            (id) =>
                                id !== movieId
                        )
                );

            } else {

                await addToWatchlist(
                    movieId
                );

                setWatchlist(
                    (prev) => [
                        ...prev,
                        movieId,
                    ]
                );

            }

        };

    return (
        <WatchlistContext.Provider
            value={{
                watchlist,
                isInWatchlist,
                toggleWatchlist,
                reloadWatchlist,
            }}
        >
            {children}
        </WatchlistContext.Provider>
    );
};