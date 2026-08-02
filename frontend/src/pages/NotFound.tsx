import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="flex min-h-[70vh] flex-col items-center justify-center">

            <h1 className="text-7xl font-bold">
                404
            </h1>

            <p className="mt-4 text-gray-400">
                Page Not Found
            </p>

            <Link
                to="/"
                className="mt-8 rounded-lg bg-red-600 px-5 py-3"
            >
                Back Home
            </Link>

        </div>
    );
};

export default NotFound;