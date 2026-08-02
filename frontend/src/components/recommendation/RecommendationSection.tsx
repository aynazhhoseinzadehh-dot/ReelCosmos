import {
    useEffect,
    useState,
} from "react";


import toast from "react-hot-toast";


import {
    getRecommendations,
} from "../../services/recommendationService";


import type {
    Movie,
} from "../../types/movie";


import RecommendationCard
    from "./RecommendationCard";

import MovieSkeleton from "../movie/MovieSkeleton";


const RecommendationSection = () => {


    const [movies,setMovies] =
        useState<Movie[]>([]);


    const [loading,setLoading] =
        useState(true);



    useEffect(()=>{

        loadRecommendations();

    },[]);



    const loadRecommendations =
        async()=>{


            try{


                const response =
                    await getRecommendations();


                setMovies(response);


            }catch{


                toast.error(
                    "Failed to load recommendations."
                );


            }finally{


                setLoading(false);


            }


        };



    if(loading){

        return (

            <section
                className="
                px-6
                py-10
                "
            >

                <h2
                    className="
                    mb-6
                    text-3xl
                    font-bold
                    text-white
                    "
                >

                    Recommended For You

                </h2>


                <div
                    className="
                    grid
                    gap-6
                    sm:grid-cols-2
                    md:grid-cols-3
                    lg:grid-cols-5
                    "
                >

                    {
                        Array
                            .from({
                                length:5
                            })
                            .map((_,index)=>(

                                <MovieSkeleton
                                    key={index}
                                />

                            ))
                    }


                </div>


            </section>

        );

    }



    if(movies.length===0){

        return (

            <section
                className="
                px-6
                py-10
                "
            >

                <div
                    className="
                    rounded-2xl
                    bg-[#181818]
                    p-8
                    text-center
                    "
                >

                    <h2
                        className="
                        text-2xl
                        font-bold
                        text-white
                        "
                    >

                        No Recommendations Yet

                    </h2>


                    <p
                        className="
                        mt-3
                        text-gray-400
                        "
                    >

                        Rate movies and build your watch history to get personalized recommendations.

                    </p>


                </div>


            </section>

        );

    }



    return (

        <section
            className="
            px-6
            py-10
            "
        >


            <h2
                className="
                mb-6
                text-3xl
                font-bold
                text-white
                "
            >

                Recommended For You

            </h2>



            <div
                className="
                grid
                gap-6
                sm:grid-cols-2
                md:grid-cols-3
                lg:grid-cols-5
                "
            >

                {
                    movies.map(movie=>(

                        <RecommendationCard
                            key={movie.id}
                            movie={movie}
                        />

                    ))
                }


            </div>


        </section>

    );


};


export default RecommendationSection;