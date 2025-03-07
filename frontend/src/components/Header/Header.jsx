import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CartIcon from '../CartIcon';
import { useDispatch, useSelector } from 'react-redux';
import CartDetails from '../CartDetails';
import { cartTabHandler } from '../../features/cart/cartSlice'
const Header = () => {
    const [activeLink, setActiveLink] = useState('Home');
    const navLinks = [
        'Home',
        'About',
        // "Cart",
        // 'Products',
        'Contact',
    ]
    const cartProducts = useSelector(state => state.cart.cartProducts)
    const cartTabClicked = useSelector(state => state.cart.cartTabClicked)
    const [totalCartProducts, setTotalCartProducts] = useState(0)
    const dispatch = useDispatch();

    const handleCartTab = () => {
        dispatch(cartTabHandler(cartTabClicked));
    }
    useEffect(() => {
        setTotalCartProducts(cartProducts.reduce((acc, product) => acc + product.quantity, 0));
    }, [cartProducts])
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
                <div className="relative cursor-pointe">
                    <div className="relative w-10 h-10 flex items-center justify-center" onClick={handleCartTab}>
                        <CartIcon className="text-gray-700 w-7 h-7" />
                        <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-semibold w-5 h-5 flex items-center justify-center rounded-full shadow-md">
                            {totalCartProducts}
                        </span>
                    </div>
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
