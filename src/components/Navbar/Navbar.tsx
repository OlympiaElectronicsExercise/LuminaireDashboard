import React, { useState } from "react";
import { useAuth } from "../../context/auth-context.tsx";

const Navbar: React.FC = () => {
    const { isLoggedIn, logout } = useAuth();

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
                <button
                    onClick={handleLogoff}
                    className="text-white bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded cursor-pointer"
                >
                    Log Off
                </button>
            )}
        </nav>
    );
};

export default Navbar;
