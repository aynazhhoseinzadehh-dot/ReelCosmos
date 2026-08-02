import type { MovieActor } from "../../types/movie";

interface Props {
    cast: MovieActor[];
}

const PLACEHOLDER =
    "https://placehold.co/300x450/1a1a1a/ffffff?text=No+Image";

const CastSection = ({ cast }: Props) => {
    if (!cast.length) return null;

    return (
        <section className="mt-12">
            <h2 className="mb-6 text-3xl font-bold">
                Cast
            </h2>

            <div className="grid gap-6 grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
                {cast.map((item) => (
                    <div
                        key={item.id}
                        className="rounded-xl bg-[#181818] overflow-hidden"
                    >
                        <img
                            src={
                                item.actor.profileImageUrl ||
                                PLACEHOLDER
                            }
                            alt={item.actor.name}
                            className="aspect-[2/3] w-full object-cover"
                        />

                        <div className="p-3">
                            <h3 className="font-semibold line-clamp-1">
                                {item.actor.name}
                            </h3>

                            <p className="text-sm text-gray-400 line-clamp-1">
                                {item.characterName || "Unknown"}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default CastSection;