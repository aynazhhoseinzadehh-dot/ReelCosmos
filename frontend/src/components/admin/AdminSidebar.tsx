import { NavLink } from "react-router-dom";

const AdminSidebar = () => {

    const linkClass = ({
                           isActive,
                       }: {
        isActive: boolean;
    }) => `
        block
        rounded-lg
        px-4
        py-3
        transition
        ${
        isActive
            ? "bg-red-600 text-white"
            : "text-gray-300 hover:bg-red-600 hover:text-white"
    }
    `;

    return (

        <aside
            className="
            min-h-screen
            w-64
            bg-[#181818]
            p-6
            "
        >

            <h2
                className="
                mb-10
                text-2xl
                font-bold
                text-red-600
                "
            >
                ReelCosmos
            </h2>

            <nav className="space-y-4">

                <NavLink
                    to="/admin"
                    className={linkClass}
                    end
                >
                    Dashboard
                </NavLink>

                <NavLink
                    to="/admin/movies"
                    className={linkClass}
                >
                    Movies
                </NavLink>

                <NavLink
                    to="/admin/genres"
                    className={linkClass}
                >
                    Genres
                </NavLink>

                <NavLink
                    to="/admin/actors"
                    className={linkClass}
                >
                    Actors
                </NavLink>

                <NavLink
                    to="/admin/users"
                    className={linkClass}
                >
                    Users
                </NavLink>

                <NavLink
                    to="/admin/reviews"
                    className={linkClass}
                >
                    Reviews
                </NavLink>

            </nav>

        </aside>

    );

};

export default AdminSidebar;