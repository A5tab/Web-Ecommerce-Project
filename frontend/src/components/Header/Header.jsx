import React, { useState } from 'react';
import { Link } from 'react-router-dom';
const Header = () => {
    const [activeLink, setActiveLink] = useState('Home');
    const navLinks = [
        'Home',
        'About',
        // "Cart",
        // 'Products',
        'Contact',
    ]
    return (
        <header className="bg-gray-800 text-white shadow-lg">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                {/* Logo */}
                <div className="text-xl font-bold">
                    <Link to="/" className="hover:text-gray-300 transition">Tech Hive</Link>
                </div>
                {/* Navigation */}
                <nav className="hidden md:flex space-x-6">
                    {navLinks.map((navLink, index) => (
                        <Link
                            to={`${navLink.toLowerCase()}`}
                            key={index}
                            className={`font-semibold hover:text-gray-300 relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-blue-500 after:transition-ease-in-out after:duration-300 ${activeLink === `${navLink}` ? "after:w-full" : "after:hover:w-full"}`}
                            onClick={() => setActiveLink(navLink)}
                        >
                            {navLink}
                        </Link>

                    ))}
                </nav>
                {/* Call to Action */}
                <div className="hidden md:block">
                    <a
                        href="#get-started"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
                    >
                        Get Started
                    </a>
                </div>
                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-gray-300 focus:outline-none"
                    aria-label="Toggle navigation"
                >
                    <svg
                        className="h-6 w-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h16m-7 6h7"
                        ></path>
                    </svg>
                </button>
            </div>
        </header>
    );
};

export default Header;
