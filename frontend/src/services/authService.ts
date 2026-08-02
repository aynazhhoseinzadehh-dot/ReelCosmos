import api from "../api/axios";

import type {
    LoginRequest,
    RegisterRequest,
    JwtResponse,
} from "../types/auth";

const AUTH_URL = "/api/auth";

export const login = async (
    data: LoginRequest
): Promise<JwtResponse> => {
    const response = await api.post<JwtResponse>(
        `${AUTH_URL}/login`,
        data
    );

    return response.data;
};

export const register = async (
    data: RegisterRequest
): Promise<JwtResponse> => {
    const response = await api.post<JwtResponse>(
        `${AUTH_URL}/register`,
        data
    );

    return response.data;
};

export const logout = async (): Promise<void> => {
    await api.post(`${AUTH_URL}/logout`);
};

export const refreshToken = async (
    refreshToken: string
): Promise<JwtResponse> => {
    const response = await api.post<JwtResponse>(
        `${AUTH_URL}/refresh`,
        {
            refreshToken,
        }
    );

    return response.data;
};