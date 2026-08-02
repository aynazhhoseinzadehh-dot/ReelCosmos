import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import toast from "react-hot-toast";

import { register as registerRequest } from "../../services/authService";
import { useAuth } from "../../hooks/useAuth";

import {
    registerSchema,
    type RegisterFormData,
} from "../../schemas/registerSchema";

const RegisterForm = () => {
    const navigate = useNavigate();

    const { login } = useAuth();

    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
    });

    const onSubmit = async (
        data: RegisterFormData
    ) => {
        try {
            setLoading(true);

            const response =
                await registerRequest(data);

            login(response);

            toast.success(
                "Account created successfully!"
            );

            navigate("/");
        } catch {
            toast.error(
                "Registration failed."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
        >
            <div>
                <input
                    type="text"
                    placeholder="Username"
                    {...register("username")}
                    className="w-full rounded-xl border border-gray-700 bg-[#181818] px-4 py-3"
                />

                <p className="mt-1 text-sm text-red-500">
                    {errors.username?.message}
                </p>
            </div>

            <div>
                <input
                    type="email"
                    placeholder="Email"
                    {...register("email")}
                    className="w-full rounded-xl border border-gray-700 bg-[#181818] px-4 py-3"
                />

                <p className="mt-1 text-sm text-red-500">
                    {errors.email?.message}
                </p>
            </div>

            <div>
                <input
                    type="password"
                    placeholder="Password"
                    {...register("password")}
                    className="w-full rounded-xl border border-gray-700 bg-[#181818] px-4 py-3"
                />

                <p className="mt-1 text-sm text-red-500">
                    {errors.password?.message}
                </p>
            </div>

            <div>
                <input
                    type="text"
                    placeholder="First Name"
                    {...register("firstName")}
                    className="w-full rounded-xl border border-gray-700 bg-[#181818] px-4 py-3"
                />

                <p className="mt-1 text-sm text-red-500">
                    {errors.firstName?.message}
                </p>
            </div>

            <div>
                <input
                    type="text"
                    placeholder="Last Name"
                    {...register("lastName")}
                    className="w-full rounded-xl border border-gray-700 bg-[#181818] px-4 py-3"
                />

                <p className="mt-1 text-sm text-red-500">
                    {errors.lastName?.message}
                </p>
            </div>

            <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-red-600 py-3 font-semibold transition hover:bg-red-700 disabled:opacity-50"
            >
                {loading
                    ? "Creating Account..."
                    : "Register"}
            </button>
        </form>
    );
};

export default RegisterForm;