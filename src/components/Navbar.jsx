import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";

function Navbar() {
    const { changeTheme, mode } = useContext(ThemeContext);

    return (
        <nav
            className={`flex items-center justify-between p-4 shadow-md transition-colors duration-300 ${
                mode === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
            }`}
        >
            {/* Shop Name */}
            <Link
                to="/"
                className={`text-2xl font-bold tracking-wide ${
                    mode === "dark" ? "text-yellow-400" : "text-blue-600"
                }`}
            >
                MyShop
            </Link>

            {/* Navigation Links */}
            <ul className="flex items-center space-x-6 text-lg font-medium">
                <li>
                    <Link
                        to="/"
                        className={`hover:underline ${
                            mode === "dark" ? "text-gray-300 hover:text-yellow-400" : "text-gray-700 hover:text-blue-500"
                        }`}
                    >
                        Home
                    </Link>
                </li>
                <li>
                    <Link
                        to="/cart"
                        className={`hover:underline ${
                            mode === "dark" ? "text-gray-300 hover:text-yellow-400" : "text-gray-700 hover:text-blue-500"
                        }`}
                    >
                        Cart
                    </Link>
                </li>
                <li>
                    <Link
                        to="/contact"
                        className={`hover:underline ${
                            mode === "dark" ? "text-gray-300 hover:text-yellow-400" : "text-gray-700 hover:text-blue-500"
                        }`}
                    >
                        Contact Us
                    </Link>
                </li>
            </ul>

            {/* Dark/Light Mode Toggle */}
            <button
                onClick={changeTheme}
                className={`px-4 py-2 rounded-lg font-medium shadow-md transition-all duration-300 ${
                    mode === "dark"
                        ? "bg-yellow-500 text-gray-800 hover:bg-yellow-600"
                        : "bg-gray-800 text-white hover:bg-gray-700"
                }`}
            >
                {mode === "light" ? "Dark Mode" : "Light Mode"}
            </button>
        </nav>
    );
}

export default Navbar;
