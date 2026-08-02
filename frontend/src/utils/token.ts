const ACCESS_TOKEN = "accessToken";
const REFRESH_TOKEN = "refreshToken";

export const saveTokens = (
    accessToken: string,
    refreshToken: string
): void => {
    localStorage.setItem(ACCESS_TOKEN, accessToken);
    localStorage.setItem(REFRESH_TOKEN, refreshToken);
};

export const getAccessToken = (): string | null => {
    return localStorage.getItem(ACCESS_TOKEN);
};

export const getRefreshToken = (): string | null => {
    return localStorage.getItem(REFRESH_TOKEN);
};

export const removeTokens = (): void => {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
};

export const isAuthenticated = (): boolean => {
    return !!getAccessToken();
};

export const getBearerToken = (): string | null => {
    const token = getAccessToken();
    return token ? `Bearer ${token}` : null;
};