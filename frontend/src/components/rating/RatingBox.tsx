import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import toast from "react-hot-toast";

import {
    createRating,
    updateRating,
    deleteRating,
    getMyRatings,
} from "../../services/ratingService";

import type { Rating } from "../../types/rating";

interface Props {
    movieId: number;
}


const RatingBox = ({
                       movieId,
                   }: Props) => {


    const [score, setScore] =
        useState<number>(0);


    const [myRating, setMyRating] =
        useState<Rating | null>(null);


    const [loading, setLoading] =
        useState(false);



    useEffect(() => {

        loadMyRating();

    }, [movieId]);



    const loadMyRating = async () => {

        try {

            const ratings =
                await getMyRatings();


            const rating =
                ratings.find(
                    (item) =>
                        item.movie.id === movieId
                );


            if (rating) {

                setMyRating(rating);

                setScore(rating.score);

            }

        } catch {

            // User may not be logged in

        }

    };



    const submitRating = async () => {


        if (score === 0) {

            toast.error(
                "Please select a rating."
            );

            return;

        }


        try {

            setLoading(true);


            if (myRating) {


                const updated =
                    await updateRating(
                        myRating.id,
                        {
                            score,
                        }
                    );


                setMyRating(updated);


                toast.success(
                    "Rating updated."
                );


            } else {


                const created =
                    await createRating(
                        movieId,
                        {
                            score,
                        }
                    );


                setMyRating(created);


                toast.success(
                    "Rating submitted."
                );

            }


        } catch {

            toast.error(
                "Something went wrong."
            );

        } finally {

            setLoading(false);

        }

    };



    const removeRating = async () => {


        if (!myRating) return;


        try {


            setLoading(true);


            await deleteRating(
                myRating.id
            );


            setMyRating(null);

            setScore(0);


            toast.success(
                "Rating removed."
            );


        } catch {

            toast.error(
                "Delete failed."
            );

        } finally {

            setLoading(false);

        }

    };



    return (

        <div
            className="
            rounded-3xl
            bg-[#181818]
            p-6
            space-y-5
            "
        >

            <h3 className="text-xl font-bold">
                Rate this movie
            </h3>



            <div
                className="
                flex
                gap-2
                "
            >

                {
                    Array.from(
                        {
                            length: 10,
                        },
                        (_, index) => {

                            const value =
                                index + 1;


                            return (

                                <button
                                    key={value}
                                    type="button"
                                    onClick={() =>
                                        setScore(value)
                                    }
                                >

                                    <FaStar
                                        size={28}
                                        className={
                                            value <= score
                                                ? "text-yellow-400"
                                                : "text-gray-600"
                                        }
                                    />

                                </button>

                            );

                        }
                    )
                }

            </div>



            <div
                className="
                flex
                gap-4
                "
            >

                <button
                    onClick={submitRating}
                    disabled={loading}
                    className="
                    rounded-xl
                    bg-red-600
                    px-6
                    py-2
                    font-semibold
                    hover:bg-red-700
                    disabled:opacity-50
                    "
                >

                    {
                        loading
                            ? "Saving..."
                            : myRating
                                ? "Update Rating"
                                : "Submit Rating"
                    }

                </button>



                {
                    myRating && (

                        <button
                            onClick={removeRating}
                            disabled={loading}
                            className="
                            rounded-xl
                            border
                            border-gray-600
                            px-6
                            py-2
                            "
                        >
                            Remove
                        </button>

                    )
                }

            </div>


        </div>

    );

};


export default RatingBox;