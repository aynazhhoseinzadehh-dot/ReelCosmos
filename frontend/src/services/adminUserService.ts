import api from "../api/axios";

import type {
    User,
    UserUpdateRequest,
    Role,
} from "../types/user";


const USERS_URL = "/api/users";


// ================================
// User Pagination Response
// ================================

export interface UserPage {

    content: User[];

    totalElements: number;

    totalPages: number;

    number: number;

    size: number;

}



// ================================
// Get Users
// Pagination + Search
// ================================

export const getUsers =
    async (

        page = 0,

        size = 10,

        search = ""

    ): Promise<UserPage> => {


        const response =
            await api.get<UserPage>(

                USERS_URL,

                {

                    params: {

                        page,

                        size,

                        search,

                    },

                }

            );


        return response.data;

    };




// ================================
// Get User By Id
// ================================

export const getUserById =
    async (

        id:number

    ):Promise<User> => {


        const response =
            await api.get<User>(

                `${USERS_URL}/${id}`

            );


        return response.data;

    };





// ================================
// Update User
// ================================

export const updateUser =
    async (

        id:number,

        data:UserUpdateRequest

    ):Promise<User> => {


        const response =
            await api.put<User>(

                `${USERS_URL}/${id}`,

                data

            );


        return response.data;

    };





// ================================
// Delete User
// ================================

export const deleteUser =
    async (

        id:number

    ):Promise<void> => {


        await api.delete(

            `${USERS_URL}/${id}`

        );

    };





// ================================
// Change Role
// ================================

export const changeUserRole =
    async (

        id:number,

        role:Role

    ):Promise<User> => {


        const response =
            await api.patch<User>(

                `${USERS_URL}/${id}/role?role=${role}`

            );


        return response.data;

    };