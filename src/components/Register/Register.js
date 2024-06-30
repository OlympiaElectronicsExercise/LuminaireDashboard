/* Standard Dependencies & Imports */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";

function Register() {
    const [email, setEmail] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const NAVIGATE = useNavigate();

    const onButtonClick = () => {
        // Set initial error values to empty
        setEmailError("");
        setPasswordError("");

        // Check if the user has entered both fields correctly
        if ("" === email) {
            setEmailError("Please enter your email");
            return;
        }

        if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            setEmailError("Please enter a valid email");
            return;
        }

        if ("" === password1) {
            setPasswordError("Please define a password");
            return;
        }

        if (password1 !== password2) {
            setPasswordError("Please write the password twice");
            return;
        }

        if (password1.length < 8) {
            setPasswordError("The password should have at least 8 characters");
            return;
        }

        register();
    };

    async function register() {
        const loginDTO = {
            email: email,
            password: password1,
        };

        fetch("http://localhost:5100/api/v1/Auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(loginDTO),
        })
            .then(function (response) {
                console.log(response);
                return response.json();
            })
            .then(function (r) {
                if (r.token) {
                    NAVIGATE("/Login");
                } else {
                    window.alert("Wrong email or password");
                }
            });
    }

    return (
        <div className="h-screen flex items-center justify-center bg-slate-900">
            <div className="box-border grid grid-cols-2 w-[64rem] border-4 border-slate-500 rounded-xl border-white">
                <div id="login-form">
                    <div className="p-10 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-light text-gray-900 md:text-2xl text-white">
                            Sign Up ~ LuminaireDashboard
                        </h1>
                        <form className="space-y-4 " action="#">
                            <div>
                                <label
                                    for="email"
                                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="loginEmail"
                                    id="loginEmail"
                                    value={email}
                                    onChange={(ev) => setEmail(ev.target.value)}
                                    class="text-white sm:text-sm rounded-lg block w-full p-2.5 bg-gray-800  placeholder-gray-400 focus:ring-blue-900 focus:border-blue-500 focus:text-blue-100"
                                    placeholder="Enter your email"
                                    required=""
                                />

                                <label className="errorLabel">
                                    {emailError}
                                </label>
                            </div>
                            <div className="mt-8">
                                <label
                                    for="password1"
                                    class="block mb-2 text-sm font-medium text-white"
                                >
                                    Password
                                </label>
                                <input
                                    type="password"
                                    name="password1"
                                    id="password1"
                                    value={password1}
                                    onChange={(ev) =>
                                        setPassword1(ev.target.value)
                                    }
                                    placeholder="••••••••"
                                    class="text-white sm:text-sm rounded-lg block w-full p-2.5 bg-gray-800  placeholder-gray-400 focus:ring-blue-900 focus:border-blue-500 focus:text-blue-100 py-2.5 mb-5"
                                    required=""
                                />

                                <label className="errorLabel">
                                    {passwordError}
                                </label>
                            </div>
                            <div className="mt-8">
                                <label
                                    for="password2"
                                    class="block mb-2 text-sm font-medium text-white"
                                >
                                    Confirm Password
                                </label>
                                <input
                                    type="password"
                                    name="password2"
                                    id="password2"
                                    value={password2}
                                    onChange={(ev) =>
                                        setPassword2(ev.target.value)
                                    }
                                    placeholder="••••••••"
                                    class="text-white sm:text-sm rounded-lg block w-full p-2.5 bg-gray-800  placeholder-gray-400 focus:ring-blue-900 focus:border-blue-500 focus:text-blue-100 py-2.5 mb-6"
                                    required=""
                                />
                            </div>

                            <input
                                type="button"
                                class="w-full text-white bg-gray-800 transition hover:bg-white hover:text-black focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                onClick={onButtonClick}
                                value={"Create an account"}
                            />

                            <p class="text-sm font-regular text-gray-200">
                                Already have an account?{" "}
                                <label
                                    class="font-medium text-primary-600 hover:underline text-white cursor-pointer"
                                    onClick={() => {
                                        NAVIGATE("/Login");
                                    }}
                                >
                                    Sign in
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

export default Register;
