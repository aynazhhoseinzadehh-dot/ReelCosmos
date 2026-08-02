import api from "../api/axios";


import type {
    User,
    UserUpdateRequest,
} from "../types/user";


const USERS_URL = "/api/users";



export const getCurrentUser =
    async (): Promise<User> => {


        const response =
            await api.get<User>(
                `${USERS_URL}/me`
            );


        return response.data;

    };



export const updateCurrentUser =
    async (
        data: UserUpdateRequest
    ): Promise<User> => {


        const response =
            await api.put<User>(
                `${USERS_URL}/me`,
                data
            );


        return response.data;

    };



export const deleteCurrentUser =
    async (): Promise<void> => {


        await api.delete(
            `${USERS_URL}/me`
        );

    };