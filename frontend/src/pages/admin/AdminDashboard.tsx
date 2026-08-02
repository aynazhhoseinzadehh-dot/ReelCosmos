import { useEffect, useState } from "react";

import AdminSidebar from "../../components/admin/AdminSidebar";

import { getMovies } from "../../services/adminMovieService";
import { getUsers } from "../../services/adminUserService";
import { getReviews } from "../../services/adminReviewService";
import { getGenres } from "../../services/genreService";
import { getActors } from "../../services/actorService";

import toast from "react-hot-toast";

const AdminDashboard = () => {

    const [stats, setStats] = useState({

        movies: 0,

        genres: 0,

        actors: 0,

        users: 0,

        reviews: 0,

    });

    useEffect(() => {

        loadStats();

    }, []);

    const loadStats = async () => {

        try {

            const [

                movies,

                genres,

                actors,

                users,

                reviews,

            ] = await Promise.all([

                getMovies(),

                getGenres(),

                getActors(),

                getUsers(),

                getReviews(),

            ]);

            setStats({

                movies: movies.totalElements,

                genres: genres.length,

                actors: actors.length,

                users: users.totalElements,

                reviews: reviews.length,

            });

        } catch {

            toast.error("Failed to load dashboard statistics.");

        }

    };

    return (

        <div className="min-h-screen bg-[#121212] text-white">

            <div className="flex">

                <AdminSidebar />

                <main className="flex-1 p-10">

                    <h1 className="text-4xl font-bold">
                        Admin Dashboard
                    </h1>

                    <p className="mt-4 text-gray-400">
                        Welcome to ReelCosmos Admin Panel
                    </p>

                    <div className="mt-10 grid gap-6 md:grid-cols-5">

                        <div className="rounded-2xl bg-[#181818] p-6">

                            <h2 className="text-xl font-semibold">
                                Movies
                            </h2>

                            <p className="mt-3 text-3xl font-bold text-red-600">
                                {stats.movies}
                            </p>

                            <p className="mt-2 text-sm text-gray-500">
                                Total movies
                            </p>

                        </div>

                        <div className="rounded-2xl bg-[#181818] p-6">

                            <h2 className="text-xl font-semibold">
                                Genres
                            </h2>

                            <p className="mt-3 text-3xl font-bold text-red-600">
                                {stats.genres}
                            </p>

                            <p className="mt-2 text-sm text-gray-500">
                                Total genres
                            </p>

                        </div>

                        <div className="rounded-2xl bg-[#181818] p-6">

                            <h2 className="text-xl font-semibold">
                                Actors
                            </h2>

                            <p className="mt-3 text-3xl font-bold text-red-600">
                                {stats.actors}
                            </p>

                            <p className="mt-2 text-sm text-gray-500">
                                Total actors
                            </p>

                        </div>

                        <div className="rounded-2xl bg-[#181818] p-6">

                            <h2 className="text-xl font-semibold">
                                Users
                            </h2>

                            <p className="mt-3 text-3xl font-bold text-red-600">
                                {stats.users}
                            </p>

                            <p className="mt-2 text-sm text-gray-500">
                                Registered users
                            </p>

                        </div>

                        <div className="rounded-2xl bg-[#181818] p-6">

                            <h2 className="text-xl font-semibold">
                                Reviews
                            </h2>

                            <p className="mt-3 text-3xl font-bold text-red-600">
                                {stats.reviews}
                            </p>

                            <p className="mt-2 text-sm text-gray-500">
                                User reviews
                            </p>

                        </div>

                    </div>

                </main>

            </div>

        </div>

    );

};

export default AdminDashboard;