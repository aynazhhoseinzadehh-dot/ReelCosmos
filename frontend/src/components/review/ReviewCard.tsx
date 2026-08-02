import { FaEdit, FaTrash } from "react-icons/fa";

import type { Review } from "../../types/review";

interface Props {
    review: Review;

    canEdit?: boolean;

    onEdit?: (review: Review) => void;

    onDelete?: (reviewId: number) => void;
}

const ReviewCard = ({
                        review,
                        canEdit = false,
                        onEdit,
                        onDelete,
                    }: Props) => {
    return (
        <div className="rounded-2xl bg-[#181818] p-6 shadow-lg">

            <div className="flex items-start justify-between">

                <div>

                    <h3 className="text-lg font-semibold">
                        {review.user.firstName} {review.user.lastName}
                    </h3>

                    <p className="text-sm text-gray-400">
                        @{review.user.username}
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                        {new Date(
                            review.createdAt
                        ).toLocaleDateString()}
                    </p>

                </div>

                {canEdit && (
                    <div className="flex gap-2">

                        <button
                            onClick={() =>
                                onEdit?.(review)
                            }
                            className="rounded-lg bg-blue-600 p-2 transition hover:bg-blue-700"
                        >
                            <FaEdit />
                        </button>

                        <button
                            onClick={() =>
                                onDelete?.(review.id)
                            }
                            className="rounded-lg bg-red-600 p-2 transition hover:bg-red-700"
                        >
                            <FaTrash />
                        </button>

                    </div>
                )}

            </div>

            <p className="mt-5 whitespace-pre-wrap leading-7 text-gray-300">
                {review.content}
            </p>

        </div>
    );
};

export default ReviewCard;