import {
    useState,
} from "react";


import toast from "react-hot-toast";


import {
    markMovieAsWatched,
} from "../../services/watchedMovieService";



interface Props {

    movieId:number;

}



const WatchedButton = ({
                           movieId,
                       }:Props) => {


    const [loading,setLoading] =
        useState(false);



    const handleClick = async()=>{


        try {


            setLoading(true);


            await markMovieAsWatched(
                movieId
            );


            toast.success(
                "Movie marked as watched."
            );


        } catch {


            toast.error(
                "Failed to mark movie."
            );


        } finally {


            setLoading(false);


        }


    };



    return (


        <button

            onClick={handleClick}

            disabled={loading}

            className="
            rounded-xl
            bg-green-600
            px-5
            py-2
            font-semibold
            hover:bg-green-700
            disabled:opacity-50
            "

        >

            {
                loading
                    ?
                    "Saving..."
                    :
                    "Watched"
            }


        </button>


    );

};


export default WatchedButton;