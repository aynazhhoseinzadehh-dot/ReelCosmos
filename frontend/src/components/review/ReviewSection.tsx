// noinspection TypeScriptCheckImport

import { useEffect, useState } from "react";

import toast from "react-hot-toast";

import ReviewForm from "./ ReviewForm";
import ReviewCard from "./ReviewCard";

import {
    getMovieReviews,
    deleteReview,
} from "../../services/reviewService";

import type { Review } from "../../types/review";

interface Props {
    movieId: number;
}

const ReviewSection = ({
                           movieId,
                       }: Props) => {
    const [reviews, setReviews] =
        useState<Review[]>([]);

    const [editingReview, setEditingReview] =
        useState<Review>();

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {
        loadReviews();
    }, [movieId]);

    const loadReviews = async () => {
        try {
            const response =
                await getMovieReviews(movieId);

            setReviews(response);
        } catch {
            toast.error(
                "Failed to load reviews."
            );
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (
        reviewId: number
    ) => {
        try {
            await deleteReview(reviewId);

            toast.success(
                "Review deleted successfully."
            );

            setEditingReview(undefined);

            loadReviews();
        } catch {
            toast.error(
                "Delete failed."
            );
        }
    };

    const handleSuccess = () => {
        setEditingReview(undefined);

        loadReviews();
    };

    return (
        <section className="space-y-8">

            <h2 className="text-3xl font-bold">
                Reviews
            </h2>

            <ReviewForm
                movieId={movieId}
                review={editingReview}
                onSuccess={handleSuccess}
            />

            {loading ? (
                <p>Loading...</p>
            ) : reviews.length === 0 ? (
                <p className="text-gray-400">
                    No reviews yet.
                </p>
            ) : (
                <div className="space-y-5">

                    {reviews.map((review) => (
                        <ReviewCard
                            key={review.id}
                            review={review}
                            canEdit
                            onEdit={setEditingReview}
                            onDelete={handleDelete}
                        />
                    ))}

                </div>
            )}

        </section>
    );
};

export default ReviewSection;