import React, { useState } from "react";
import { useAuth } from "../../context/auth-context.tsx";

const Navbar: React.FC = () => {
    const { isLoggedIn, email, logout } = useAuth();

    const handleLogoff = () => {
        console.log("Logging off..");
        logout();
    };

    return (
        <nav className="bg-gray-800 p-4 flex justify-between items-center text-white">
            <div className="flex items-center">
                <span className="mr-4 font-bold">Olympia Electronics</span>
            </div>
            {isLoggedIn && (
                <>
                    <p className="mr-4 p-2 pl-7 bg-slate-900 rounded-lg relative font-mono">
                        Welcome, {email.split("@")[0]}
                        <div className="bg-green-500 h-2 w-2 rounded-lg absolute left-3 top-4 bottom-0"></div>
                    </p>
                    <button
                        onClick={handleLogoff}
                        className="text-white bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded cursor-pointer"
                    >
                        Log Off
                    </button>
                </>
            )}
        </nav>
    );
};

export default Navbar;
