import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { ThemeContext } from "../context/ThemeContext";
import { Link } from "react-router-dom";

function Cart() {
    const {
        addCart,
        removeCart,
        clearCart,
        cart,
        decrementItemQuantity,
        incrementItemQuantity,
    } = useContext(CartContext);

    const { mode } = useContext(ThemeContext);
    const isCartEmpty = cart.length === 0;

    return (
        <div
            className={`min-h-screen flex flex-col items-center p-6 transition-colors duration-300 ${
                mode === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
            }`}
        >
            <h1 className="text-4xl font-extrabold mb-6 text-center">
                {isCartEmpty ? "Your Cart is Empty" : "Your Shopping Cart"}
            </h1>

            {/* Cart Items */}
            <ul
                className={`w-full max-w-4xl space-y-6 ${
                    isCartEmpty ? "hidden" : "block"
                }`}
            >
                {cart.map((item) => (
                    <li
                        key={item.id}
                        className={`flex items-center rounded-lg shadow-md p-4 gap-6 transition-transform duration-300 ease-in-out ${
                            mode === "dark"
                                ? "bg-gray-800 text-white hover:shadow-lg hover:shadow-gray-700"
                                : "bg-white text-gray-900 hover:shadow-lg hover:shadow-gray-200"
                        }`}
                    >
                        {/* Item Image */}
                        <img
                            src={item.images}
                            alt={item.title}
                            className="w-20 h-20 object-cover rounded-lg border border-gray-300"
                        />

                        {/* Item Details */}
                        <div className="flex-1">
                            <h2 className="text-lg font-semibold mb-1">{item.title}</h2>
                            <p
                                className={`text-sm mb-2 ${
                                    mode === "dark" ? "text-gray-400" : "text-gray-600"
                                }`}
                            >
                                Price:{" "}
                                <span
                                    className={`font-bold ${
                                        mode === "dark" ? "text-green-400" : "text-green-600"
                                    }`}
                                >
                                    ${item.price}
                                </span>
                            </p>
                            <p
                                className={`text-sm ${
                                    mode === "dark" ? "text-gray-400" : "text-gray-600"
                                }`}
                            >
                                Quantity: {item.quantity}
                            </p>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => decrementItemQuantity(item.id)}
                                className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 active:scale-95 transition-all"
                            >
                                -
                            </button>
                            <button
                                onClick={() => incrementItemQuantity(item.id)}
                                className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 active:scale-95 transition-all"
                            >
                                +
                            </button>
                            <button
                                onClick={() => removeCart(item.id)}
                                className="px-3 py-1 bg-gray-500 text-white rounded-lg hover:bg-gray-600 active:scale-95 transition-all"
                            >
                                Remove
                            </button>
                        </div>
                    </li>
                ))}
            </ul>

            {/* Empty Cart Message */}
            {isCartEmpty && (
                <div className="flex flex-col items-center mt-16">
                    <p className="text-lg text-gray-500">Your cart is currently empty.</p>
                    <Link to="/">
                    <button
                        className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 active:scale-95 transition-all"
                        
                        >
                        Start Shopping
                    </button>
                      </Link>
                </div>
            )}

            {/* Clear Cart Button */}
            {!isCartEmpty && (
                <button
                    onClick={clearCart}
                    className="mt-8 px-6 py-3 bg-red-500 text-white rounded-lg shadow-lg hover:bg-red-600 active:scale-95 transition-all duration-300"
                >
                    Clear Cart
                </button>
            )}
        </div>
    );
}

export default Cart;
