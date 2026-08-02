import {
    useEffect,
    useMemo,
    useState,
} from "react";

import toast from "react-hot-toast";

import AdminSidebar from "../../components/admin/AdminSidebar";

import {
    getReviews,
    deleteReview,
} from "../../services/adminReviewService";

import type {
    Review,
} from "../../types/review";

const ManageReviews = () => {

    const [reviews, setReviews] =
        useState<Review[]>([]);

    const [loading, setLoading] =
        useState(true);

    const [search, setSearch] =
        useState("");

    const [page, setPage] =
        useState(0);

    const [rowsPerPage, setRowsPerPage] =
        useState(10);

    useEffect(() => {

        loadReviews();

    }, []);

    const loadReviews = async () => {

        try {

            setLoading(true);

            const data =
                await getReviews();

            setReviews(data);

        } catch {

            toast.error(
                "Failed to load reviews."
            );

        } finally {

            setLoading(false);

        }

    };

    const handleDelete = async (
        id:number
    ) => {

        const confirmDelete =
            window.confirm(
                "Delete this review?"
            );

        if(!confirmDelete)
            return;

        try{

            await deleteReview(id);

            toast.success(
                "Review deleted."
            );

            loadReviews();

        }catch{

            toast.error(
                "Delete failed."
            );

        }

    };

    const filteredReviews =
        useMemo(()=>{

            const keyword =
                search
                    .trim()
                    .toLowerCase();

            if(!keyword)
                return reviews;

            return reviews.filter(review=>

                review.user.username
                    .toLowerCase()
                    .includes(keyword)

                ||

                review.movie.title
                    .toLowerCase()
                    .includes(keyword)

                ||

                review.content
                    .toLowerCase()
                    .includes(keyword)

            );

        },[
            reviews,
            search,
        ]);

    const totalPages =
        Math.max(
            1,
            Math.ceil(
                filteredReviews.length /
                rowsPerPage
            )
        );

    const paginatedReviews =
        filteredReviews.slice(

            page * rowsPerPage,

            page * rowsPerPage +
            rowsPerPage

        );
    return (

        <div className="min-h-screen bg-[#121212] text-white">

            <div className="flex">

                <AdminSidebar />

                <main className="flex-1 p-10">

                    <h1 className="mb-8 text-4xl font-bold">
                        Manage Reviews
                    </h1>

                    <div
                        className="
                        mb-6
                        flex
                        gap-4
                        "
                    >

                        <input

                            value={search}

                            onChange={(e)=>{

                                setSearch(
                                    e.target.value
                                );

                                setPage(0);

                            }}

                            placeholder="Search reviews..."

                            className="
                            flex-1
                            rounded-xl
                            border
                            border-gray-700
                            bg-[#181818]
                            p-3
                            "

                        />

                        <select

                            value={rowsPerPage}

                            onChange={(e)=>{

                                setRowsPerPage(
                                    Number(
                                        e.target.value
                                    )
                                );

                                setPage(0);

                            }}

                            className="
                            rounded-xl
                            border
                            border-gray-700
                            bg-[#181818]
                            px-4
                            "

                        >

                            <option value={10}>
                                10
                            </option>

                            <option value={20}>
                                20
                            </option>

                            <option value={50}>
                                50
                            </option>

                            <option value={100}>
                                100
                            </option>

                        </select>

                    </div>

                    {

                        loading

                            ?

                            (

                                <p>

                                    Loading...

                                </p>

                            )

                            :

                            (

                                <>

                                    <div className="overflow-hidden rounded-2xl bg-[#181818]">

                                        <table className="w-full">

                                            <thead className="border-b border-gray-700">

                                            <tr>

                                                <th className="p-4 text-left">
                                                    User
                                                </th>

                                                <th className="p-4 text-left">
                                                    Movie
                                                </th>

                                                <th className="p-4 text-left">
                                                    Review
                                                </th>

                                                <th className="p-4 text-left">
                                                    Date
                                                </th>

                                                <th className="p-4 text-left">
                                                    Actions
                                                </th>

                                            </tr>
                                            </thead>

                                            <tbody>

                                            {

                                                paginatedReviews.map(review=>(

                                                    <tr

                                                        key={review.id}

                                                        className="border-b border-gray-800"

                                                    >

                                                        <td className="p-4">

                                                            {review.user.username}

                                                        </td>

                                                        <td className="p-4">

                                                            {review.movie.title}

                                                        </td>

                                                        <td className="max-w-lg p-4">

                                                            {review.content}

                                                        </td>

                                                        <td className="p-4">

                                                            {

                                                                new Date(

                                                                    review.createdAt

                                                                ).toLocaleDateString()

                                                            }

                                                        </td>

                                                        <td className="p-4">

                                                            <button

                                                                onClick={()=>handleDelete(review.id)}

                                                                className="
                                                            rounded-lg
                                                            bg-red-600
                                                            px-4
                                                            py-2
                                                            hover:bg-red-700
                                                            "

                                                            >

                                                                Delete

                                                            </button>

                                                        </td>

                                                    </tr>

                                                ))

                                            }

                                            </tbody>

                                        </table>

                                    </div>

                                    <div
                                        className="
                                    mt-6
                                    flex
                                    items-center
                                    justify-center
                                    gap-4
                                    "
                                    >

                                        <button

                                            disabled={page===0}

                                            onClick={()=>
                                                setPage(
                                                    page-1
                                                )
                                            }

                                            className="
                                        rounded-lg
                                        bg-[#181818]
                                        px-4
                                        py-2
                                        disabled:opacity-50
                                        "

                                        >

                                            Previous

                                        </button>
                                        <span>

                                        Page {page+1} of {totalPages}

                                    </span>

                                        <button

                                            disabled={
                                                page >= totalPages-1
                                            }

                                            onClick={()=>
                                                setPage(
                                                    page+1
                                                )
                                            }

                                            className="
                                        rounded-lg
                                        bg-[#181818]
                                        px-4
                                        py-2
                                        disabled:opacity-50
                                        "

                                        >

                                            Next

                                        </button>

                                    </div>

                                </>

                            )

                    }

                </main>

            </div>

        </div>

    );

};

export default ManageReviews;