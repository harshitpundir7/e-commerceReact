import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

function Contact() {
    const {mode } = useContext(ThemeContext)
   
    return (
        <div className={`min-h-screen ${mode === "dark" ? "bg-gray-900" : "bg-gray-100"} text-gray-900 dark:text-white flex items-center justify-center p-6`}>
    <div className={`max-w-3xl w-full ${mode === "dark" ? "bg-gray-800" : "bg-white"} rounded-lg shadow-lg p-8`}>
        <h1 className="text-4xl font-bold text-center mb-6 text-orange-500">
            Contact Us
        </h1>
        <p className={`text-lg text-center ${mode === "dark" ? "text-gray-300" : "text-gray-700"} mb-6`}>
            We'd love to hear from you! Fill out the form below or reach us
            through other contact methods.
        </p>
        

        <div className="mt-8 text-center">
            <h2 className="text-2xl font-semibold mb-4">Our Contact Information</h2>
            <p className={`text-lg mb-2 ${mode === "dark" ? "text-gray-300" : "text-gray-700"}`}>Email: contact@yourstore.com</p>
            <p className={`text-lg mb-2 ${mode === "dark" ? "text-gray-300" : "text-gray-700"}`}>Phone: +123 456 7890</p>
            <p className={`text-lg ${mode === "dark" ? "text-gray-300" : "text-gray-700"}`}>Address: 123 E-commerce Street, New Delhi, India</p>
        </div>

        <div className="mt-8">
            {/* Optional Map Section */}
            <h3 className="text-xl font-semibold mb-4">Find Us Here</h3>
            <div className="relative w-full h-72 rounded-lg overflow-hidden shadow-md">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d242182.04057194424!2d77.209021!3d28.613939!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d0d7f84ab8cb9%3A0xd6e7d8b8b13b47b2!2sNew%20Delhi%2C%20Delhi%2C%20India!5e0!3m2!1sen!2sin!4v1670807125356!5m2!1sen!2sin"
                    className="absolute w-full h-full border-0"
                    title="Location Map"
                    loading="lazy"
                ></iframe>
            </div>
        </div>
    </div>
</div>

    );
}

export default Contact;
