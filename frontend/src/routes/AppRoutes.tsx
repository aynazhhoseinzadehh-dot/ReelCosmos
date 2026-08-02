import { Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import Home from "../pages/Home";
import Movies from "../pages/Movies";
import MovieDetails from "../pages/MovieDetails";
import Favorites from "../pages/Favorites";
import Profile from "../pages/Profile";
import Login from "../pages/Login";
import Register from "../pages/Register";
import NotFound from "../pages/NotFound";
import ManageReviews from "../pages/admin/ManageReviews";
import AdminDashboard from "../pages/admin/AdminDashboard";
import ManageMovies from "../pages/admin/ManageMovies";
import ManageGenres from "../pages/admin/ManageGenres.tsx";
import ManageActors from "../pages/admin/ManageActors";
import WatchedMovies from "../pages/WatchedMovies";
import ProtectedRoute from "./ProtectedRoute";
import AdminRoute from "./AdminRoute";

const AppRoutes = () => {

    return (

        <Routes>

            <Route element={<MainLayout />}>

                <Route
                    path="/"
                    element={<Home />}
                />

                <Route
                    path="/movies"
                    element={<Movies />}
                />

                <Route
                    path="/movies/:id"
                    element={<MovieDetails />}
                />

                <Route
                    path="/favorites"
                    element={
                        <ProtectedRoute>
                            <Favorites />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/profile/watched"
                    element={
                        <ProtectedRoute>
                            <WatchedMovies />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/profile"
                    element={
                        <ProtectedRoute>
                            <Profile />
                        </ProtectedRoute>
                    }
                />

            </Route>

            <Route
                path="/login"
                element={<Login />}
            />

            <Route
                path="/register"
                element={<Register />}
            />

            {/* ADMIN */}

            <Route
                path="/admin"
                element={
                    <AdminRoute>
                        <AdminDashboard />
                    </AdminRoute>
                }
            />

            <Route
                path="/admin/movies"
                element={
                    <AdminRoute>
                        <ManageMovies />
                    </AdminRoute>
                }
            />

            <Route
                path="/admin/genres"
                element={
                    <AdminRoute>
                        <ManageGenres />
                    </AdminRoute>
                }
            />

            <Route
                path="/admin/actors"
                element={
                    <AdminRoute>
                        <ManageActors />
                    </AdminRoute>
                }
            />
            <Route
                path="/admin/reviews"
                element={
                    <AdminRoute>
                        <ManageReviews />
                    </AdminRoute>
                }
            />

            <Route
                path="*"
                element={<NotFound />}
            />

        </Routes>

    );

};

export default AppRoutes;