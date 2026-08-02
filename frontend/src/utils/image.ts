const TMDB_IMAGE_BASE_URL =
    "https://image.tmdb.org/t/p/w500";

const PLACEHOLDER_IMAGE =
    "https://placehold.co/500x750/1f1f1f/ffffff?text=No+Image";

export const getImageUrl = (
    path?: string | null
): string => {

    if (!path || path.trim() === "") {
        return PLACEHOLDER_IMAGE;
    }

    if (
        path.startsWith("http://") ||
        path.startsWith("https://")
    ) {
        return path;
    }

    return `${TMDB_IMAGE_BASE_URL}${path}`;
};