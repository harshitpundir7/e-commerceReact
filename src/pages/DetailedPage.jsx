import React, { useContext, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ProductContext } from '../context/ProductContext';
import axios from 'axios';
import { CartContext } from '../context/CartContext';
import { ThemeContext } from '../context/ThemeContext';

function DetailedPage() {
    const { id } = useParams();
    const { product } = useContext(ProductContext);
    const [item, setItem] = useState(null);
    const { addCart } = useContext(CartContext);
    const { mode } = useContext(ThemeContext);

    useEffect(() => {
        const filtering = async () => {
            if (!product || product.length === 0) {
                try {
                    const response = await axios.get(`https://dummyjson.com/products/${id}`);
                    setItem(response.data);
                } catch (error) {
                    console.log("Error fetching data: " + error);
                }
            } else {
                const filteredItem = product.find((item) => item.id === parseInt(id));
                setItem(filteredItem);
            }
        };
        filtering();
    }, [id, product]);

    // Conditional classes for light and dark mode
    const containerClass = mode === "light" ? "bg-white text-black" : "bg-gray-900 text-white";
    const cardClass = mode === "light" ? "bg-gray-100 text-gray-900" : "bg-gray-800 text-white";
    const priceClass = mode === "light" ? "text-green-600" : "text-green-400";
    const buttonClass = (color) =>
        `px-6 py-2 rounded-lg font-medium transition duration-300 ${color === "orange"
            ? mode === "light" ? "bg-orange-500 text-white hover:bg-orange-600" : "bg-orange-600 hover:bg-orange-700"
            : mode === "light" ? "bg-blue-500 text-white hover:bg-blue-600" : "bg-blue-600 hover:bg-blue-700"}`;

    return (
        <div className={`min-h-screen flex items-center justify-center p-6 ${containerClass}`}>
            {item ? (
                <div className={`max-w-4xl w-full rounded-lg shadow-lg p-8 ${cardClass}`}>
                    {/* Image Section */}
                    <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
                        <img
                            src={item.images[0]}
                            alt={item.title}
                            className="w-full lg:w-1/2 rounded-lg shadow-md object-cover"
                        />

                        {/* Content Section */}
                        <div className="flex-1">
                            {/* Title and Brand */}
                            <h1 className="text-4xl font-bold text-orange-400 mb-2">{item.title}</h1>
                            <p className="text-gray-400 text-lg font-semibold mb-4">
                                Brand: {item.brand}
                            </p>

                            {/* Rating */}
                            <div className="flex items-center mb-4">
                                <span className="text-yellow-400 text-lg font-bold mr-2">
                                    {item.rating}
                                </span>
                                <span className="text-sm text-gray-400">(Ratings)</span>
                            </div>

                            {/* Price */}
                            <p className={`text-2xl font-bold mb-6 ${priceClass}`}>
                                ₹{item.price}
                            </p>

                            {/* Description */}
                            <p className="mb-6">{item.description}</p>

                            {/* Action Buttons */}
                            <div className="flex gap-4">
                                <button
                                    onClick={() => addCart(item)}
                                    className={buttonClass("orange")}
                                >
                                    Add to Cart
                                </button>
                                <Link to="/cart">
                                    <button className={buttonClass("blue")}>
                                        Go to Cart
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="text-center">
                    <p className="text-xl font-semibold text-gray-400 animate-pulse">Loading...</p>
                </div>
            )}
        </div>
    );
}

export default DetailedPage;
