import { useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import toast from "react-hot-toast";

import {
    createReview,
    updateReview,
} from "../../services/reviewService";

import {
    reviewSchema,
    type ReviewFormData,
} from "../../schemas/reviewSchema";

import type { Review } from "../../types/review";

interface Props {
    movieId: number;

    review?: Review;

    onSuccess: () => void;
}

const ReviewForm = ({
                        movieId,
                        review,
                        onSuccess,
                    }: Props) => {
    const [loading, setLoading] =
        useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ReviewFormData>({
        resolver: zodResolver(reviewSchema),

        defaultValues: {
            content: review?.content ?? "",
        },
    });

    useEffect(() => {
        reset({
            content: review?.content ?? "",
        });
    }, [review, reset]);

    const onSubmit = async (
        data: ReviewFormData
    ) => {
        try {
            setLoading(true);

            if (review) {
                await updateReview(
                    review.id,
                    data
                );

                toast.success(
                    "Review updated successfully."
                );
            } else {
                await createReview(
                    movieId,
                    data
                );

                toast.success(
                    "Review added successfully."
                );

                reset();
            }

            onSuccess();
        } catch {
            toast.error(
                "Something went wrong."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5 rounded-3xl bg-[#181818] p-6"
        >
            <div>
                <textarea
                    rows={6}
                    placeholder="Write your review..."
                    {...register("content")}
                    className="w-full rounded-xl border border-gray-700 bg-[#121212] px-4 py-3 outline-none focus:border-red-600"
                />

                <p className="mt-2 text-sm text-red-500">
                    {errors.content?.message}
                </p>
            </div>

            <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-red-600 py-3 font-semibold transition hover:bg-red-700 disabled:opacity-50"
            >
                {loading
                    ? review
                        ? "Updating..."
                        : "Posting..."
                    : review
                        ? "Update Review"
                        : "Post Review"}
            </button>
        </form>
    );
};
export default ReviewForm;