import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CartIcon from '../CartIcon';
import { useDispatch, useSelector } from 'react-redux';
import { cartTabHandler } from '../../features/cart/cartSlice';
import { Search } from 'lucide-react';
import axios from '../../api/axios.js';

const Header = () => {
    const [activeLink, setActiveLink] = useState('Home');
    const [searchQuery, setSearchQuery] = useState('');
    const [showDropdown, setShowDropDown] = useState(false);
    const [searchProducts, setSearchProducts] = useState([]);

    const cartProducts = useSelector(state => state.cart.cartProducts);
    const cartTabClicked = useSelector(state => state.cart.cartTabClicked);
    const [totalCartProducts, setTotalCartProducts] = useState(0);
    const dispatch = useDispatch();

    const navLinks = ['Home', 'About', 'Contact'];

    const handleCartTab = () => {
        dispatch(cartTabHandler(cartTabClicked));
    };

    async function queryDbForProduct() {
        try {
            const response = await axios.get(`/product/search-by-title/${searchQuery}`);
            setSearchProducts([response.data.data] || []);
        } catch (error) {
            setSearchProducts([]);
        }
    }

    useEffect(() => {
        const productSearchTimeout = setTimeout(() => {
            if (searchQuery.trim() !== '') {
                queryDbForProduct();
            } else {
                setSearchProducts([]);
            }
        }, 500);

        return () => clearTimeout(productSearchTimeout);
    }, [searchQuery]);

    useEffect(() => {
        setTotalCartProducts(cartProducts.reduce((acc, product) => acc + product.quantity, 0));
    }, [cartProducts]);

    return (
        <header className="bg-gray-800 text-white shadow-lg">
            <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
                <div className='flex items-center space-x-8'>
                    <div className="text-xl font-bold">
                        <Link to="/" className="hover:text-gray-300 transition">Tech Hive</Link>
                    </div>
                    <nav className="hidden md:flex space-x-6">
                        {navLinks.map((navLink, index) => (
                            <Link
                                to={`/${navLink.toLowerCase()}`}
                                key={index}
                                className={`font-semibold hover:text-gray-300 relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-blue-500 after:transition-all after:duration-300 ${activeLink === navLink ? 'after:w-full' : 'after:hover:w-full'}`}
                                onClick={() => setActiveLink(navLink)}
                            >
                                {navLink}
                            </Link>
                        ))}
                    </nav>
                </div>

                <div className='flex items-center space-x-4 flex-1 max-w-xs md:max-w-md lg:max-w-lg'>
                    <div className="relative flex items-center bg-gray-900 rounded-full border border-gray-700 focus-within:border-cyan-400 flex-grow">
                        <label htmlFor="searchProducts" className="absolute left-3 text-gray-400">
                            <Search className="w-5 h-5" />
                        </label>
                        <input
                            id="searchProducts"
                            type="search"
                            placeholder="Search Products"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onFocus={() => setShowDropDown(true)}
                            onBlur={() => setTimeout(() => setShowDropDown(false), 200)}
                            className="w-full py-2 pl-10 pr-4 rounded-full bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
                        />
                        {showDropdown && (
                            <div className='absolute top-full bg-gray-800 w-full max-h-96 mt-1 border border-gray-600 rounded-lg shadow-lg z-50 overflow-y-auto'>
                                {searchProducts.length > 0 ? (
                                    searchProducts.map(product => (
                                        <Link to={`/product/${product._id}`} key={product._id}>
                                            <div className='flex items-center px-4 py-3 hover:bg-gray-700'>
                                                <img src={product.mainImage} alt={product.title} className='w-8 h-8 object-cover rounded-sm' />
                                                <h1 className='px-4 text-white text-sm'>{product.title}</h1>
                                            </div>
                                        </Link>
                                    ))
                                ) : (
                                    <p className='px-4 py-3 text-gray-400 text-sm'>No Products Found</p>
                                )}
                            </div>
                        )}
                    </div>
                    <div className="relative cursor-pointer hover:scale-105 duration-300" onClick={handleCartTab}>
                        <div className="relative w-10 h-10 flex items-center justify-center">
                            <CartIcon className="text-white w-7 h-7" />
                            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-semibold w-5 h-5 flex items-center justify-center rounded-full shadow-md">
                                {totalCartProducts}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;