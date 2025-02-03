import React, { useContext, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ProductContext } from '../context/ProductContext';
import axios from 'axios';
import { CartContext } from '../context/CartContext';
import { ThemeContext } from '../context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';

function DetailedPage() {
    const { id } = useParams();
    const { product } = useContext(ProductContext);
    const [item, setItem] = useState(null);
    const { addCart } = useContext(CartContext);
    const { mode } = useContext(ThemeContext);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

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

    const containerClass = mode === "light" ? "bg-white text-black" : "bg-gray-900 text-white";
    const cardClass = mode === "light" ? "bg-gray-100 text-gray-900" : "bg-gray-800 text-white";
    const priceClass = mode === "light" ? "text-green-600" : "text-green-400";
    const buttonClass = (color) =>
        `px-6 py-2 rounded-lg font-medium transition duration-300 ${color === "orange"
            ? mode === "light" ? "bg-orange-500 text-white hover:bg-orange-600" : "bg-orange-600 hover:bg-orange-700"
            : mode === "light" ? "bg-blue-500 text-white hover:bg-blue-600" : "bg-blue-600 hover:bg-blue-700"}`;

    // Animation variants
    const pageVariants = {
        initial: { opacity: 0, y: 20 },
        animate: { 
            opacity: 1, 
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        },
        exit: { 
            opacity: 0,
            y: -20,
            transition: {
                duration: 0.4
            }
        }
    };

    const imageVariants = {
        hover: { 
            scale: 1.05,
            transition: {
                duration: 0.3,
                ease: "easeInOut"
            }
        }
    };

    const contentVariants = {
        initial: { opacity: 0, x: 50 },
        animate: { 
            opacity: 1, 
            x: 0,
            transition: {
                delay: 0.3,
                duration: 0.5
            }
        }
    };

    const buttonVariants = {
        hover: { 
            scale: 1.05,
            transition: {
                duration: 0.2,
                ease: "easeInOut"
            }
        },
        tap: { scale: 0.95 }
    };

    return (
        <AnimatePresence mode="wait">
            <motion.div 
                className={`min-h-screen flex items-center justify-center p-6 ${containerClass}`}
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
            >
                {item ? (
                    <motion.div 
                        className={`max-w-4xl w-full rounded-lg shadow-lg p-8 ${cardClass}`}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
                            {/* Image Section with Hover Effect */}
                            <motion.div
                                className="w-full lg:w-1/2 relative overflow-hidden rounded-lg"
                                variants={imageVariants}
                                whileHover="hover"
                            >
                                <motion.img
                                    src={item.images[currentImageIndex]}
                                    alt={item.title}
                                    className="w-full rounded-lg shadow-md object-cover"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.5 }}
                                    drag="x"
                                    dragConstraints={{ left: 0, right: 0 }}
                                    onDragEnd={(e, { offset, velocity }) => {
                                        if (offset.x < -50 && currentImageIndex < item.images.length - 1) {
                                            setCurrentImageIndex(prev => prev + 1);
                                        } else if (offset.x > 50 && currentImageIndex > 0) {
                                            setCurrentImageIndex(prev => prev - 1);
                                        }
                                    }}
                                />
                            </motion.div>

                            {/* Content Section */}
                            <motion.div 
                                className="flex-1"
                                variants={contentVariants}
                                initial="initial"
                                animate="animate"
                            >
                                {/* Title with Animation */}
                                <motion.h1 
                                    className="text-4xl font-bold text-orange-400 mb-2"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 }}
                                >
                                    {item.title}
                                </motion.h1>

                                {/* Brand */}
                                <motion.p 
                                    className="text-gray-400 text-lg font-semibold mb-4"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                                >
                                    Brand: {item.brand}
                                </motion.p>

                                {/* Rating with Animation */}
                                <motion.div 
                                    className="flex items-center mb-4"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.6 }}
                                >
                                    <motion.span 
                                        className="text-yellow-400 text-lg font-bold mr-2"
                                        whileHover={{ scale: 1.2 }}
                                    >
                                        {item.rating}
                                    </motion.span>
                                    <span className="text-sm text-gray-400">(Ratings)</span>
                                </motion.div>

                                {/* Price with Animation */}
                                <motion.p 
                                    className={`text-2xl font-bold mb-6 ${priceClass}`}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.7 }}
                                >
                                    ₹{item.price}
                                </motion.p>

                                {/* Description with Animation */}
                                <motion.p 
                                    className="mb-6"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.8 }}
                                >
                                    {item.description}
                                </motion.p>

                                {/* Action Buttons with Animation */}
                                <motion.div 
                                    className="flex gap-4"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.9 }}
                                >
                                    <motion.button
                                        onClick={() => addCart(item)}
                                        className={buttonClass("orange")}
                                        variants={buttonVariants}
                                        whileHover="hover"
                                        whileTap="tap"
                                    >
                                        Add to Cart
                                    </motion.button>
                                    <Link to="/cart">
                                        <motion.button 
                                            className={buttonClass("blue")}
                                            variants={buttonVariants}
                                            whileHover="hover"
                                            whileTap="tap"
                                        >
                                            Go to Cart
                                        </motion.button>
                                    </Link>
                                </motion.div>
                            </motion.div>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div 
                        className="text-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <p className="text-xl font-semibold text-gray-400 animate-pulse">Loading...</p>
                    </motion.div>
                )}
            </motion.div>
        </AnimatePresence>
    );
}

export default DetailedPage;