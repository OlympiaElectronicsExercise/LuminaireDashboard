/* Standard Dependencies & Imports */
import { useNavigate } from 'react-router-dom';
import './Register.css';
import React from 'react';

function Register() {

    const NAVIGATE = useNavigate();

    return (
        <div className='h-screen flex items-center justify-center bg-slate-900'>
            <div className='box-border grid grid-cols-2 w-[64rem] border-4 border-slate-500 rounded-xl border-white'>
                <div id='login-form'>
                    <div className='p-10 space-y-4 md:space-y-6 sm:p-8'>
                        <h1 className='text-xl font-bold leading-tight tracking-light text-gray-900 md:text-2xl text-white'>
                            Sign Up ~ LuminaireDashboard
                        </h1>
                        <form className='space-y-4 ' action='#'>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                <input type="email" name="loginEmail" id="loginEmail" className="text-white sm:text-sm rounded-lg block w-full p-2.5 bg-gray-800  placeholder-gray-400 focus:ring-blue-900 focus:border-blue-500 focus:text-blue-100" placeholder="Enter your email" required />
                            </div>
                            <div className='mt-8'>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-white">Password</label>
                                <input type="password" name="loginPassword" id="loginPassword" placeholder="••••••••" className="text-white sm:text-sm rounded-lg block w-full p-2.5 bg-gray-800  placeholder-gray-400 focus:ring-blue-900 focus:border-blue-500 focus:text-blue-100 py-2.5 mb-5" required />
                            </div>
                            <div className='mt-8'>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-white">Confirm Password</label>
                                <input type="password" name="loginPassword" id="loginPassword" placeholder="••••••••" className="text-white sm:text-sm rounded-lg block w-full p-2.5 bg-gray-800  placeholder-gray-400 focus:ring-blue-900 focus:border-blue-500 focus:text-blue-100 py-2.5 mb-6" required />
                            </div>

                            <button type="submit" className="w-full text-white bg-gray-800 transition hover:bg-white hover:text-black focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Create an account</button>
                            <p className="text-sm font-regular text-gray-200">
                                Already have an account? <label className="font-medium text-primary-600 hover:underline text-white cursor-pointer" onClick={() => { NAVIGATE("/Login") }}>Sign in</label>
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

export default Register;