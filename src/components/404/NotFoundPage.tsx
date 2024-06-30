import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage: React.FC = () => {
    return (
        <div className="h-screen flex flex-col items-center justify-center bg-slate-900 text-white">
            <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
            <p className="text-lg mb-4">
                Oops! The page you are looking for does not exist.
            </p>
            <Link
                to="/dashboard"
                className="text-white bg-gray-800 transition hover:bg-white hover:text-black focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
                Go to Homepage
            </Link>
        </div>
    );
};

export default NotFoundPage;
