/* Standard Dependencies & Imports */
import { useNavigate } from "react-router-dom";
import "./Login.css";
import React, { useState } from "react";

function Login() {
    const NAVIGATE = useNavigate();

    const [email, setEmail] = useState("example@example.com");
    const [password, setPassword] = useState("Aa123456!");
    const [errorMessage, setErrorMessage] = useState("");

    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);

    const handleFakeSubmit = (e) => {
        NAVIGATE("/dashboard");
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevents the default form submission behavior
        try {
            const response = await fetch(
                "http://localhost:5100/api/v1/Auth/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email, password }),
                }
            );

            if (response.ok) {
                const data = await response.json();
                // Handle success, e.g., navigate to another page or store the token
                console.log("Login Success:", data);
                NAVIGATE("/dashboard"); // Example: navigate to a dashboard
            } else if (response.status === 401 || response.status === 404) {
                const errorData = await response.json();
                setErrorMessage(
                    errorData.detail || "Unauthorized or Not Found"
                );
            } else {
                throw new Error("Something went wrong");
            }
        } catch (error) {
            console.error("Login Error:", error);
            setErrorMessage(JSON.stringify(error));
        }
    };

    return (
        <div className="h-screen flex items-center justify-center bg-slate-900">
            <div className="box-border grid grid-cols-2 h-[32rem] w-[64rem] border-4 border-slate-500 rounded-xl border-white">
                <div id="login-form">
                    <div className="p-10 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-light text-gray-900 md:text-2xl text-white">
                            Sign in ~ LuminaireDashboard
                        </h1>
                        <form
                            className="space-y-4 "
                            onSubmit={handleFakeSubmit}
                        >
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white mt-10"
                                >
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="loginEmail"
                                    id="loginEmail"
                                    className="text-white sm:text-sm rounded-lg block w-full p-2.5 bg-gray-800  placeholder-gray-400 focus:ring-blue-900 focus:border-blue-500 focus:text-blue-100"
                                    placeholder="Enter your email"
                                    required
                                    onChange={handleEmailChange}
                                    value={email}
                                />
                            </div>
                            <div className="mt-12">
                                <label
                                    htmlFor="password"
                                    className="block mb-2 text-sm font-medium text-white mt-5"
                                >
                                    Password
                                </label>
                                <input
                                    type="password"
                                    name="loginPassword"
                                    id="loginPassword"
                                    placeholder="••••••••"
                                    className="text-white sm:text-sm rounded-lg block w-full p-2.5 bg-gray-800  placeholder-gray-400 focus:ring-blue-900 focus:border-blue-500 focus:text-blue-100 py-2.5"
                                    required
                                    onChange={handlePasswordChange}
                                    value={password}
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-start mt-7">
                                    <div className="flex items-center h-5">
                                        <input
                                            id="remember"
                                            aria-describedby="remember"
                                            type="checkbox"
                                            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-3"
                                        />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label
                                            htmlFor="remember"
                                            className="text-gray-500 dark:text-gray-300"
                                        >
                                            Remember me
                                        </label>
                                    </div>
                                </div>
                                <a
                                    href="#"
                                    className="text-sm font-medium text-primary-600 hover:underline text-white mt-7"
                                >
                                    Forgot password?
                                </a>
                            </div>
                            <button
                                type="submit"
                                className="w-full text-white bg-gray-800 transition hover:bg-white hover:text-black focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                            >
                                Sign in
                            </button>
                            <p className="text-sm font-regular text-red-500">
                                {errorMessage}
                            </p>
                            <p className="text-sm font-regular text-gray-200">
                                Don’t have an account yet?{" "}
                                <label
                                    className="font-medium text-primary-600 hover:underline text-white cursor-pointer"
                                    onClick={() => {
                                        NAVIGATE("/Register");
                                    }}
                                >
                                    Sign up
                                </label>
                            </p>
                        </form>
                    </div>
                </div>
                <div
                    id="left-section-logo"
                    className="grid grid-col-1 bg-white place-items-center place-content-center"
                >
                    <div>
                        <img src="images/logo.png" />
                    </div>
                    <div>
                        <p className="flex justify-center items-center p-10 text-justify font-semibold">
                            Η Olympia Electronics S.A. είναι η ηγέτιδα εταιρεία
                            στην ελληνική βιομηχανία συστημάτων ασφάλειας.
                            <br></br>
                            <br></br> Η εταιρεία δραστηριοποιείται στην ανάπτυξη
                            καινοτόμων συστημάτων ασφάλειας χρησιμοποιώντας
                            τεχνολογία αιχμής.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
