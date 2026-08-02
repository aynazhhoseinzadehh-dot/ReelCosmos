import RecommendationSection
    from "../components/recommendation/RecommendationSection";


const Home = () => {

    return (

        <section
            className="
            min-h-screen
            bg-[#121212]
            text-white
            "
        >

            <div
                className="
                mx-auto
                max-w-7xl
                px-6
                py-12
                "
            >

                <h1
                    className="
                    text-5xl
                    font-bold
                    "
                >

                    Welcome to ReelCosmos

                </h1>


                <p
                    className="
                    mt-6
                    max-w-2xl
                    text-gray-400
                    leading-8
                    "
                >

                    Discover, rate, review and organize your favorite movies.

                </p>


            </div>


            <RecommendationSection />


        </section>

    );

};


export default Home;