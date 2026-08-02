import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const Navbar = () => {
    const { isAuthenticated, logout } = useAuth();

    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <header className="sticky top-0 z-50 border-b border-gray-800 bg-[#141414]/90 backdrop-blur">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

                <Link
                    to="/"
                    className="flex items-center gap-3"
                >
                    <img
                        src="/logo.png"
                        alt="ReelCosmos"
                        className="h-10 w-auto"
                    />

                    <span className="text-xl font-bold tracking-wide">
                        ReelCosmos
                    </span>
                </Link>

                <nav className="flex items-center gap-8">

                    <NavLink to="/">
                        Home
                    </NavLink>

                    <NavLink to="/movies">
                        Movies
                    </NavLink>

                    {isAuthenticated && (
                        <>
                            <NavLink to="/favorites">
                                Favorites
                            </NavLink>

                            <NavLink to="/watchlist">
                                Watchlist
                            </NavLink>

                            <NavLink to="/profile">
                                Profile
                            </NavLink>

                            <NavLink to="/watched">
                                Watched Movies
                            </NavLink>
                        </>
                    )}

                </nav>

                <div className="flex items-center gap-3">

                    {!isAuthenticated ? (
                        <>
                            <Link to="/login">
                                Login
                            </Link>

                            <Link
                                to="/register"
                                className="rounded-lg bg-red-600 px-4 py-2 transition hover:bg-red-700"
                            >
                                Register
                            </Link>
                        </>
                    ) : (
                        <button
                            onClick={handleLogout}
                            className="rounded-lg bg-red-600 px-4 py-2 transition hover:bg-red-700"
                        >
                            Logout
                        </button>
                    )}

                </div>

            </div>
        </header>
    );
};

export default Navbar;