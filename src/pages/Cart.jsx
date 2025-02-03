import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { ThemeContext } from "../context/ThemeContext";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

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
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className={`min-h-screen flex flex-col items-center p-6 transition-colors duration-300 ${
                mode === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
            }`}
        >
            <motion.h1
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-4xl font-extrabold mb-6 text-center"
            >
                {isCartEmpty ? "Your Cart is Empty" : "Your Shopping Cart"}
            </motion.h1>

            {/* Cart Items */}
            <motion.ul
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className={`w-full max-w-4xl space-y-6 ${isCartEmpty ? "hidden" : "block"}`}
            >
                {cart.map((item) => (
                    <motion.li
                        key={item.id}
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 50 }}
                        transition={{ duration: 0.4 }}
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
                            <motion.button
                                whileTap={{ scale: 0.9 }}
                                onClick={() => decrementItemQuantity(item.id)}
                                className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all"
                            >
                                -
                            </motion.button>
                            <motion.button
                                whileTap={{ scale: 0.9 }}
                                onClick={() => incrementItemQuantity(item.id)}
                                className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
                            >
                                +
                            </motion.button>
                            <motion.button
                                whileTap={{ scale: 0.9 }}
                                onClick={() => removeCart(item.id)}
                                className="px-3 py-1 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-all"
                            >
                                Remove
                            </motion.button>
                        </div>
                    </motion.li>
                ))}
            </motion.ul>

            {/* Empty Cart Message */}
            {isCartEmpty && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col items-center mt-16"
                >
                    <p className="text-lg text-gray-500">Your cart is currently empty.</p>
                    <Link to="/">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 transition-all"
                        >
                            Start Shopping
                        </motion.button>
                    </Link>
                </motion.div>
            )}

            {/* Clear Cart Button */}
            {!isCartEmpty && (
                <motion.button
                    onClick={clearCart}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="mt-8 px-6 py-3 bg-red-500 text-white rounded-lg shadow-lg hover:bg-red-600 transition-all"
                >
                    Clear Cart
                </motion.button>
            )}
        </motion.div>
    );
}

export default Cart;
