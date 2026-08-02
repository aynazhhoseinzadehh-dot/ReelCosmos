import RegisterForm from "../components/auth/RegisterForm";

const Register = () => {
    return (
        <section className="flex min-h-[80vh] items-center justify-center px-6">
            <div className="w-full max-w-md rounded-3xl bg-[#181818] p-8 shadow-2xl">

                <h1 className="mb-8 text-center text-4xl font-bold">
                    Create Account
                </h1>

                <RegisterForm />

            </div>
        </section>
    );
};

export default Register;