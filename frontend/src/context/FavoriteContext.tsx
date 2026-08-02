import {
    createContext,
    useEffect,
    useState,
    type ReactNode,
} from "react";

import {
    getFavorites,
    addFavorite,
    removeFavorite,
} from "../services/favoriteService";

import { useAuth } from "../hooks/useAuth";

interface FavoriteContextType {
    favorites: number[];

    isFavorite: (movieId: number) => boolean;

    toggleFavorite: (movieId: number) => Promise<void>;

    reloadFavorites: () => Promise<void>;
}

export const FavoriteContext =
    createContext({} as FavoriteContextType);

interface Props {
    children: ReactNode;
}

export const FavoriteProvider = ({
                                     children,
                                 }: Props) => {

    const { isAuthenticated } = useAuth();

    const [favorites, setFavorites] =
        useState<number[]>([]);

    useEffect(() => {

        if (isAuthenticated) {

            reloadFavorites();

        } else {

            setFavorites([]);

        }

    }, [isAuthenticated]);

    const reloadFavorites = async () => {

        try {

            const movies =
                await getFavorites();

            setFavorites(
                movies.map((movie) => movie.id)
            );

        } catch {

            setFavorites([]);

        }

    };

    const isFavorite = (
        movieId: number
    ) => favorites.includes(movieId);

    const toggleFavorite = async (
        movieId: number
    ) => {

        if (favorites.includes(movieId)) {

            await removeFavorite(movieId);

            setFavorites((prev) =>
                prev.filter((id) => id !== movieId)
            );

        } else {

            await addFavorite(movieId);

            setFavorites((prev) => [
                ...prev,
                movieId,
            ]);

        }

    };

    return (
        <FavoriteContext.Provider
            value={{
                favorites,
                isFavorite,
                toggleFavorite,
                reloadFavorites,
            }}
        >
            {children}
        </FavoriteContext.Provider>
    );
};