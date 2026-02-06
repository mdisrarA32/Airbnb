import React, { useContext, useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { authDataContext } from "../Context/AuthContext";
import axios from "axios";
import { userDataContext } from "../Context/UserContext";
import { toast } from "react-toastify";

function Login() {
    const [show, setShow] = useState(false);
    const { serverUrl, loading, setLoading } = useContext(authDataContext);
    const { setUserData } = useContext(userDataContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        setLoading(true);
        try {
            e.preventDefault();
            let result = await axios.post(
                serverUrl + "/api/auth/login",
                { email, password },
                { withCredentials: true }
            );
            setUserData(result.data);
            toast.success("Login Successfully");
            navigate("/");
        } catch (error) {
            toast.error(error.response?.data?.message || "Login failed");
        }
        setLoading(false);
    };

    return (
        <div className="h-screen w-full flex">
            {/* LEFT PANEL */}
            <div className="w-full md:w-1/2 bg-white flex items-center justify-center">
                <form
                    onSubmit={handleLogin}
                    className="w-[80%] max-w-md flex flex-col gap-6"
                >
                    <div className="mb-2">
                        <h1 className="text-4xl font-bold text-gray-900 tracking-tight">Welcome back</h1>
                        <p className="text-gray-500 mt-2">Please enter your details to sign in.</p>
                    </div>

                    <div className="space-y-4">
                        <input
                            type="email"
                            placeholder="Email"
                            className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:border-rose-500 focus:ring-4 focus:ring-rose-50 outline-none transition-all duration-300 placeholder:text-gray-400 bg-gray-50 focus:bg-white"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />

                        <div className="relative">
                            <input
                                type={show ? "text" : "password"}
                                placeholder="Password"
                                className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:border-rose-500 focus:ring-4 focus:ring-rose-50 outline-none transition-all duration-300 placeholder:text-gray-400 bg-gray-50 focus:bg-white"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            {show ? (
                                <IoMdEyeOff
                                    className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-gray-600 w-5 h-5"
                                    onClick={() => setShow(false)}
                                />
                            ) : (
                                <IoMdEye
                                    className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-gray-600 w-5 h-5"
                                    onClick={() => setShow(true)}
                                />
                            )}
                        </div>
                    </div>

                    <div className="flex justify-between text-sm items-center">
                        <label className="flex items-center gap-2 cursor-pointer text-gray-600 select-none">
                            <input type="checkbox" className="rounded text-rose-500 focus:ring-rose-500 border-gray-300 w-4 h-4" />
                            Remember me
                        </label>
                        <span className="cursor-pointer text-rose-500 font-semibold hover:underline">
                            Forgot Password?
                        </span>
                    </div>

                    <button
                        className="w-full py-4 bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-bold rounded-xl shadow-lg hover:shadow-rose-500/30 transform hover:-translate-y-0.5 transition-all duration-200 text-lg disabled:opacity-70 disabled:cursor-not-allowed"
                        disabled={loading}
                    >
                        {loading ? "Loading..." : "Log In"}
                    </button>

                    <p className="text-center text-gray-500">
                        Don’t have an account?{" "}
                        <span
                            className="text-rose-600 font-bold cursor-pointer hover:underline"
                            onClick={() => navigate("/signup")}
                        >
                            Sign up
                        </span>
                    </p>
                </form>
            </div>

            {/* RIGHT PANEL */}
            <div className="hidden md:flex w-1/2 bg-gradient-to-br from-black to-gray-800 text-white p-16 flex-col justify-center gap-6">
                <div className="bg-white/10 p-4 rounded-xl">📘 Support Center</div>
                <div className="bg-white/10 p-4 rounded-xl">🕒 Product Roadmap</div>
                <div className="bg-white/10 p-4 rounded-xl">⬆ Latest Releases</div>
                <div className="bg-white/10 p-4 rounded-xl">👥 Community</div>
            </div>
        </div>
    );
}

export default Login;
