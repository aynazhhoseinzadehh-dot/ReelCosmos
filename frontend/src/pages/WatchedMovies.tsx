import {
    useEffect,
    useState,
} from "react";


import toast from "react-hot-toast";


import {
    getMyWatchedMovies,
    deleteWatchedMovie,
} from "../services/watchedMovieService";


import type {
    WatchedMovie,
} from "../types/watchedMovie";



const WatchedMovies = () => {


    const [movies,setMovies] =
        useState<WatchedMovie[]>([]);



    const [loading,setLoading] =
        useState(true);




    useEffect(()=>{


        loadWatchedMovies();


    },[]);





    const loadWatchedMovies = async()=>{


        try{


            const response =
                await getMyWatchedMovies();



            setMovies(response);



        }catch{


            toast.error(
                "Failed to load watched movies."
            );


        }finally{


            setLoading(false);


        }


    };







    const handleDelete = async(
        id:number
    )=>{


        const confirm =
            window.confirm(
                "Remove this movie from watched list?"
            );



        if(!confirm)
            return;




        try{


            await deleteWatchedMovie(id);



            toast.success(
                "Removed from watched list."
            );



            loadWatchedMovies();



        }catch{


            toast.error(
                "Delete failed."
            );


        }


    };






    if(loading){


        return (

            <div className="p-10 text-white">

                Loading...

            </div>

        );

    }







    return (


        <section
            className="
            min-h-screen
            bg-[#121212]
            p-10
            text-white
            "
        >



            <h1
                className="
                mb-8
                text-4xl
                font-bold
                "
            >

                Watched Movies

            </h1>






            {
                movies.length === 0

                    ?

                    (

                        <p className="text-gray-400">

                            No watched movies yet.

                        </p>

                    )

                    :

                    (

                        <div
                            className="
                        grid
                        gap-6
                        md:grid-cols-3
                        "
                        >


                            {
                                movies.map(
                                    watched => (

                                        <div
                                            key={
                                                watched.id
                                            }
                                            className="
                                    rounded-2xl
                                    bg-[#181818]
                                    p-5
                                    "
                                        >



                                            <h2
                                                className="
                                        mb-3
                                        text-xl
                                        font-bold
                                        "
                                            >

                                                {
                                                    watched.movie.title
                                                }

                                            </h2>




                                            <p className="text-gray-400">

                                                Watched:
                                                {" "}
                                                {
                                                    new Date(
                                                        watched.watchedAt
                                                    )
                                                        .toLocaleDateString()
                                                }

                                            </p>




                                            <p className="mt-2 text-gray-400">

                                                Rewatch:{" "}
                                                {
                                                    watched.rewatchCount
                                                }

                                            </p>





                                            <button

                                                onClick={()=>
                                                    handleDelete(
                                                        watched.id
                                                    )
                                                }

                                                className="
                                        mt-5
                                        rounded-lg
                                        bg-red-600
                                        px-4
                                        py-2
                                        hover:bg-red-700
                                        "

                                            >

                                                Remove

                                            </button>




                                        </div>


                                    )
                                )
                            }


                        </div>

                    )

            }



        </section>


    );


};



export default WatchedMovies;