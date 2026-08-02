import type { User } from "./user";


export interface JwtResponse {

    accessToken: string;

    refreshToken: string;

    tokenType: string;

    expiresIn: number;

}



export interface LoginRequest {

    usernameOrEmail: string;

    password: string;

}



export interface RegisterRequest {

    username: string;

    email: string;

    password: string;

    firstName: string;

    lastName: string;

}



export interface AuthContextType {

    isAuthenticated: boolean;

    user?: User;

    login: (
        response: JwtResponse
    ) => Promise<void>;

    logout: () => void;

}