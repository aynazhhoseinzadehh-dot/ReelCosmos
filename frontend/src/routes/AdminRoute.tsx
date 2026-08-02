import { Navigate } from "react-router-dom";


import { useAuth } from "../hooks/useAuth";


interface Props {

    children: React.ReactNode;

}



const AdminRoute = ({
                        children,
                    }: Props) => {


    const {
        isAuthenticated,
        user,
    } = useAuth();



    if (!isAuthenticated) {

        return (
            <Navigate
                to="/login"
                replace
            />
        );

    }



    if (user?.role !== "ADMIN") {

        return (
            <Navigate
                to="/"
                replace
            />
        );

    }



    return children;

};


export default AdminRoute;