import { Link } from "react-router-dom";

import { FaStar } from "react-icons/fa";


import type {
    Recommendation,
} from "../../types/recommendation";



interface Props {

    movie: Recommendation;

}



const PLACEHOLDER =
    "https://placehold.co/500x750/1a1a1a/ffffff?text=No+Poster";



const RecommendationCard = ({
                                movie,
                            }: Props) => {


    return (

        <Link
            to={`/movies/${movie.id}`}
            className="
            group
            overflow-hidden
            rounded-2xl
            bg-[#181818]
            transition
            hover:-translate-y-1
            "
        >

            <div
                className="
                aspect-[2/3]
                overflow-hidden
                "
            >

                <img

                    src={
                        movie.posterUrl ||
                        PLACEHOLDER
                    }

                    alt={movie.title}

                    className="
                    h-full
                    w-full
                    object-cover
                    transition
                    duration-500
                    group-hover:scale-105
                    "

                />

            </div>


            <div
                className="
                p-4
                "
            >

                <h3
                    className="
                    line-clamp-1
                    text-lg
                    font-semibold
                    text-white
                    "
                >

                    {movie.title}

                </h3>


                <div
                    className="
                    mt-3
                    flex
                    items-center
                    gap-2
                    text-yellow-400
                    "
                >

                    <FaStar />


                    <span>

                        {
                            movie.averageRating
                                ?.toFixed(1)
                            ?? "0.0"
                        }

                    </span>


                </div>


            </div>


        </Link>

    );

};


export default RecommendationCard;