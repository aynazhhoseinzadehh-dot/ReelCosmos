const Footer = () => {
    return (
        <footer className="border-t border-gray-800 py-8 mt-10">
            <div className="mx-auto max-w-7xl px-6 text-center text-gray-400">

                <p className="font-semibold">
                    ReelCosmos
                </p>

                <p className="mt-2">
                    Movie Management & Recommendation Platform
                </p>

                <p className="mt-4 text-sm">
                    © {new Date().getFullYear()} Aynaz Hosseinzadeh
                </p>

            </div>
        </footer>
    );
};

export default Footer;