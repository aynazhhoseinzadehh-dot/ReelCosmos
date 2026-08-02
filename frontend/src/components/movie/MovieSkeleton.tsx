const MovieSkeleton = () => {
    return (
        <div className="overflow-hidden rounded-2xl bg-[#181818] animate-pulse">

            <div className="aspect-[2/3] bg-gray-700" />

            <div className="space-y-3 p-4">

                <div className="h-5 rounded bg-gray-700" />

                <div className="h-4 w-2/3 rounded bg-gray-700" />

                <div className="h-4 w-1/2 rounded bg-gray-700" />

            </div>

        </div>
    );
};

export default MovieSkeleton;