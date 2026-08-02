import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import toast from "react-hot-toast";

import { login as loginRequest } from "../../services/authService";
import { useAuth } from "../../hooks/useAuth";

import {
    loginSchema,
    type LoginFormData,
} from "../../schemas/loginSchema";

const LoginForm = () => {
    const navigate = useNavigate();

    const { login } = useAuth();

    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (
        data: LoginFormData
    ) => {
        try {
            setLoading(true);

            const response =
                await loginRequest(data);

            login(response);

            toast.success("Welcome back!");

            navigate("/");
        } catch (error: any) {
            toast.error(
                error.response?.data?.message ??
                "Login failed."
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
                    placeholder="Username or Email"
                    {...register("usernameOrEmail")}
                    className="w-full rounded-xl border border-gray-700 bg-[#181818] px-4 py-3"
                />

                <p className="mt-1 text-sm text-red-500">
                    {errors.usernameOrEmail?.message}
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

            <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-red-600 py-3 font-semibold transition hover:bg-red-700 disabled:opacity-50"
            >
                {loading ? "Signing in..." : "Login"}
            </button>
        </form>
    );
};

export default LoginForm;