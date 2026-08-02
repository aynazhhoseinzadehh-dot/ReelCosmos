import { useContext } from "react";
import { FavoriteContext } from "../context/FavoriteContext";

export const useFavorite = () => {
    return useContext(FavoriteContext);
};