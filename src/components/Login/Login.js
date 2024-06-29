/* Standard Dependencies & Imports */
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")

    const NAVIGATE = useNavigate();

    const onButtonClick = () => {
        // Set initial error values to empty
        setEmailError("")
        setPasswordError("")

        // Check if the user has entered both fields correctly
        if ("" === email) {
            setEmailError("Please enter your email")
            return
        }

        if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            setEmailError("Please enter a valid email")
            return
        }

        if ("" === password) {
            setPasswordError("Please enter a password")
            return
        }

        login();
    }

    async function login() {
        const loginDTO = {
            email: email,
            password: password
        }

        fetch('https://localhost:7252/api/v1/Auth/login',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(loginDTO)
            })
            .then(function (response) {
                console.log(response)
                return response.json();
            })
            .then(function (r) {
                if (r.token) {
                    NAVIGATE("/Dashboard");
                } else {
                    window.alert("Wrong email or password");
                }
            });
    }

    return (
        <div className='h-screen flex items-center justify-center bg-slate-900'>
            <div className='box-border grid grid-cols-2 h-[32rem] w-[64rem] border-4 border-slate-500 rounded-xl border-white'>
                <div id='login-form'>
                    <div className='p-10 space-y-4 md:space-y-6 sm:p-8'>
                        <h1 className='text-xl font-bold leading-tight tracking-light text-gray-900 md:text-2xl text-white'>
                            Sign in ~ LuminaireDashboard
                        </h1>
                        <form className='space-y-4 ' action='#'>
                            <div>
                                <label for="email" class="block mb-2 text-sm font-medium text-white mt-10">Email</label>
                                <input type="email"
                                    name="loginEmail"
                                    id="loginEmail"
                                    value={email}
                                    onChange={ev => setEmail(ev.target.value)}
                                    class="text-white sm:text-sm rounded-lg block w-full p-2.5 bg-gray-800  placeholder-gray-400 focus:ring-blue-900 focus:border-blue-500 focus:text-blue-100"
                                    placeholder="Enter your email"
                                    required="" />

                                <label className="errorLabel">{emailError}</label>
                            </div>
                            <div className='mt-12'>
                                <label for="password" class="block mb-2 text-sm font-medium text-white mt-5">Password</label>
                                <input type="password"
                                    name="loginPassword"
                                    id="loginPassword"
                                    value={password}
                                    onChange={ev => setPassword(ev.target.value)}
                                    placeholder="••••••••"
                                    class="text-white sm:text-sm rounded-lg block w-full p-2.5 bg-gray-800  placeholder-gray-400 focus:ring-blue-900 focus:border-blue-500 focus:text-blue-100 py-2.5"
                                    required="" />

                                <label className="errorLabel">{passwordError}</label>
                            </div>
                            <div class="flex items-center justify-between">
                                <div class="flex items-start mt-7">
                                    <div class="flex items-center h-5">
                                        <input id="remember" aria-describedby="remember" type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-3" required="" />
                                    </div>
                                    <div class="ml-3 text-sm">
                                        <label for="remember" class="text-gray-500 dark:text-gray-300">Remember me</label>
                                    </div>
                                </div>
                                <a href="#" class="text-sm font-medium text-primary-600 hover:underline text-white mt-7">Forgot password?</a>
                            </div>
                            <input type="button" class="w-full text-white bg-gray-800 transition hover:bg-white hover:text-black focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                onClick={onButtonClick} value={"Sign in"} />
                            <p class="text-sm font-regular text-gray-200">
                                Don’t have an account yet? <label class="font-medium text-primary-600 hover:underline text-white cursor-pointer" onClick={() => { NAVIGATE("/Register") }}>Sign up</label>
                            </p>
                        </form>

                    </div>
                </div>
                <div id='left-section-logo' className="grid grid-col-1 bg-white place-items-center place-content-center">
                    <div>
                        <img src='images/logo.png' />
                    </div>
                    <div>
                        <p className='flex justify-center items-center p-10 text-justify font-semibold'>Η Olympia Electronics S.A. είναι η ηγέτιδα εταιρεία στην ελληνική βιομηχανία συστημάτων ασφάλειας.<br></br><br></br> Η εταιρεία δραστηριοποιείται στην ανάπτυξη καινοτόμων συστημάτων  ασφάλειας χρησιμοποιώντας τεχνολογία αιχμής.</p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Login;