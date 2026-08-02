import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";

import { getMovieRatings } from "../../services/ratingService";

import type { Rating } from "../../types/rating";


interface Props {
    movieId: number;
}


const RatingList = ({
                        movieId,
                    }: Props) => {


    const [ratings, setRatings] =
        useState<Rating[]>([]);


    const [loading, setLoading] =
        useState(true);



    useEffect(() => {

        loadRatings();

    }, [movieId]);



    const loadRatings = async () => {

        try {

            const response =
                await getMovieRatings(movieId);


            setRatings(response);


        } finally {

            setLoading(false);

        }

    };



    if (loading) {

        return (

            <div className="rounded-3xl bg-[#181818] p-6">

                Loading ratings...

            </div>

        );

    }



    return (

        <section
            className="
            rounded-3xl
            bg-[#181818]
            p-8
            space-y-6
            "
        >

            <h2 className="text-2xl font-bold">
                User Ratings
            </h2>



            {ratings.length === 0 ? (

                <p className="text-gray-400">
                    No ratings yet.
                </p>

            ) : (

                <div className="space-y-4">


                    {ratings.map((rating) => (

                        <div
                            key={rating.id}
                            className="
                            rounded-xl
                            bg-[#121212]
                            p-5
                            "
                        >

                            <div
                                className="
                                flex
                                items-center
                                justify-between
                                "
                            >

                                <div>

                                    <p className="font-semibold">
                                        {rating.user.firstName}{" "}
                                        {rating.user.lastName}
                                    </p>

                                    <p className="text-sm text-gray-500">
                                        @{rating.user.username}
                                    </p>

                                </div>



                                <div
                                    className="
                                    flex
                                    items-center
                                    gap-2
                                    text-yellow-400
                                    "
                                >

                                    <FaStar />

                                    <span>
                                        {rating.score}
                                    </span>

                                </div>


                            </div>


                        </div>

                    ))}


                </div>

            )}


        </section>

    );

};


export default RatingList;