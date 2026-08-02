import {
    createContext,
    useEffect,
    useState,
    type ReactNode,
} from "react";


import type {
    AuthContextType,
    JwtResponse,
} from "../types/auth";


import type {
    User,
} from "../types/user";


import {
    saveTokens,
    removeTokens,
    isAuthenticated as hasToken,
} from "../utils/token";


import {
    getCurrentUser,
} from "../services/userService";



interface Props {
    children: ReactNode;
}



export const AuthContext =
    createContext<AuthContextType>(
        {} as AuthContextType
    );



export const AuthProvider = ({
                                 children,
                             }: Props) => {


    const [isAuthenticated, setIsAuthenticated] =
        useState(false);


    const [user, setUser] =
        useState<User | undefined>();



    useEffect(() => {


        const loadUser = async () => {


            if (!hasToken()) {
                return;
            }


            try {

                const currentUser =
                    await getCurrentUser();


                setUser(currentUser);

                setIsAuthenticated(true);


            } catch {

                removeTokens();

                setUser(undefined);

                setIsAuthenticated(false);

            }

        };


        loadUser();


    }, []);




    const login = async (
        response: JwtResponse
    ) => {


        saveTokens(
            response.accessToken,
            response.refreshToken
        );


        const currentUser =
            await getCurrentUser();


        setUser(currentUser);


        setIsAuthenticated(true);

    };




    const logout = () => {


        removeTokens();


        setUser(undefined);


        setIsAuthenticated(false);

    };




    return (

        <AuthContext.Provider
            value={{
                isAuthenticated,
                user,
                login,
                logout,
            }}
        >

            {children}

        </AuthContext.Provider>

    );

};