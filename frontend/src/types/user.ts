export type Role =
    | "USER"
    | "ADMIN";


export interface User {

    id: number;

    username: string;

    email: string;

    firstName?: string;

    lastName?: string;

    bio?: string;

    profileImageUrl?: string;

    role: Role;

}


export interface UserUpdateRequest {

    firstName?: string;

    lastName?: string;

    bio?: string;

    profileImageUrl?: string;

}