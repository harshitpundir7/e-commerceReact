import React, { useContext, useEffect, useState } from "react";
import { ProductContext } from "../context/ProductContext";
import { Link } from "react-router-dom";
import axios from "axios";
import { CartContext } from "../context/CartContext";
import { ThemeContext } from "../context/ThemeContext";

function Dashboard() {
    const [data, setData] = useState([]);
    const { setProduct } = useContext(ProductContext);
    const { addCart } = useContext(CartContext);
    const { mode } = useContext(ThemeContext);

    useEffect(() => {
        axios
            .get("https://dummyjson.com/products")
            .then((res) => {
                setData(res.data.products);
                setProduct(res.data.products); // Update context
            })
            .catch((error) => console.error(error));
    }, []);

    return (
        <div
            className={`flex flex-wrap justify-center gap-6 p-6 ${
                mode === "light" ? "bg-gray-100" : "bg-gray-900"
            }`}
        >
            {data.map((d) => (
                <div
                    key={d.id}
                    className={`w-full max-w-sm border rounded-lg shadow-md transform hover:scale-105 hover:shadow-lg transition-transform duration-300 ${
                        mode === "light"
                            ? "bg-white border-gray-200"
                            : "bg-gray-800 border-gray-700"
                    }`}
                >
                    {/* Image Section */}
                    <a href="#">
                        <img
                            className="rounded-t-lg w-full h-64 object-cover"
                            src={d.images[0]}
                            alt={d.title}
                        />
                    </a>

                    {/* Content Section */}
                    <div className="px-6 pb-6">
                        <a href="#">
                            <h5
                                className={`text-xl font-semibold tracking-tight truncate ${
                                    mode === "light" ? "text-gray-900" : "text-white"
                                }`}
                            >
                                {d.title}
                            </h5>
                        </a>

                        {/* Rating Section */}
                        <div className="flex items-center mt-3 mb-4">
                            {Array.from({ length: 5 }, (_, index) => (
                                <svg
                                    key={index}
                                    className={`w-4 h-4 ${
                                        index < d.rating
                                            ? "text-yellow-400"
                                            : "text-gray-600"
                                    }`}
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 22 20"
                                >
                                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                </svg>
                            ))}
                            <span
                                className={`ml-3 text-xs font-semibold px-2.5 py-0.5 rounded ${
                                    mode === "light"
                                        ? "bg-blue-100 text-blue-800"
                                        : "bg-blue-800 text-blue-200"
                                }`}
                            >
                                {d.rating.toFixed(1)} / 5
                            </span>
                        </div>

                        {/* Price and Add to Cart */}
                        <div className="flex items-center justify-between mb-4">
                            <span
                                className={`text-2xl font-bold ${
                                    mode === "light" ? "text-gray-900" : "text-white"
                                }`}
                            >
                                ${d.price.toFixed(2)}
                            </span>
                            <button
                                onClick={() => addCart(d)}
                                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors focus:ring-4 ${
                                    mode === "light"
                                        ? "text-white bg-yellow-500 hover:bg-yellow-600 focus:ring-yellow-300"
                                        : "text-white bg-yellow-500 hover:bg-yellow-600 focus:ring-yellow-800"
                                }`}
                            >
                                Add to Cart
                            </button>
                        </div>

                        {/* Detailed Button */}
                        <Link to={`/detailed-page/${d.id}`}>
                            <button
                                className={`flex items-center justify-center w-full px-4 py-2 text-sm font-medium rounded-lg focus:ring-4 ${
                                    mode === "light"
                                        ? "text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-300"
                                        : "text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
                                }`}
                            >
                                View Details
                                <svg
                                    className="w-4 h-4 ml-2"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 14 10"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M1 5h12m0 0L9 1m4 4L9 9"
                                    />
                                </svg>
                            </button>
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Dashboard;
