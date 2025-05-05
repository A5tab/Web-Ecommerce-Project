import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useProducts } from "../../context/ProductsProvider";
import CartIcon from '../CartIcon'
import { useDispatch } from "react-redux";
import { addToCart } from '../../features/cart/cartSlice.js'
import DOMPurify from 'dompurify';
import useProductAddedQT from "../../hooks/useProductAddedQT.js";

function ProductPage() {
    const { productId } = useParams();
    const dispatch = useDispatch();
    const { state: { products = [], loading } } = useProducts();
    const getProductQT = useProductAddedQT();
    const [addedProductQT, setAddedProductQT] = useState(0);

    useEffect(() => {
        const addedProductQuantity = getProductQT(productId);
        setAddedProductQT(addedProductQuantity);
    }, [getProductQT])


    if (loading) {
        return (
            <div className="py-8 px-4 sm:px-8 lg:px-16">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Loading...</h2>
                <p className="text-gray-500">Please wait while we fetch the product details.</p>
            </div>
        );
    }

    const product = products.find((p) => p._id?.toString() === productId);

    if (!product) {
        return (
            <div className="py-8 px-4 sm:px-8 lg:px-16">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Product Not Found</h2>
                <p className="text-gray-500">The product you are looking for does not exist.</p>
            </div>
        );
    }

    console.log(product);
    console.log(product.features);
    console.log(typeof product.features);
    
    const featuresList = Array.isArray(product.features)
        ? product.features[0].trim().split(",")
        : product.features?.split(",") || [];

    return (
        <div className="py-10 px-4 sm:px-8 lg:px-16 max-w-7xl mx-auto bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {/* Product Images - Left Column */}
                <div className="space-y-6">
                    <div className="bg-white rounded-2xl overflow-hidden shadow-xl border-2 border-indigo-100 transform transition-transform hover:scale-[1.01] duration-300">
                        <img
                            src={product.mainImage || "/placeholder.svg"}
                            alt={product.title}
                            className="w-full h-[450px] object-contain p-4"
                        />
                    </div>

                    <div className="flex gap-4 overflow-x-auto pb-2 snap-x">
                        {product.images.map((img, index) => (
                            <div
                                key={index}
                                className="flex-shrink-0 snap-center cursor-pointer rounded-xl overflow-hidden border-2 border-indigo-200 hover:border-indigo-500 transition-all duration-200 shadow-md"
                            >
                                <img
                                    src={img || "/placeholder.svg"}
                                    alt={`${product.title} ${index + 1}`}
                                    className="h-24 w-24 object-cover"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Product Details - Right Column */}
                <div className="flex flex-col space-y-6">
                    <div>
                        <h1 className="text-3xl sm:text-4xl font-bold text-indigo-900 mb-2">{product.title}</h1>
                        <div className="h-1 w-20 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mb-6"></div>
                    </div>

                    {/* Price and Stock */}
                    <div className="bg-white rounded-xl p-6 space-y-3 shadow-lg border-l-4 border-indigo-500">
                        <div className="flex items-baseline">
                            <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">${product.price}</span>
                        </div>

                        <p className={`flex items-center ${product.stock > 0 ? "text-emerald-600" : "text-rose-600"} font-medium`}>
                            {product.stock > 0 ? (
                                <>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span>In Stock</span>
                                    <span className="text-indigo-600 ml-1 font-bold">({product.stock} available)</span>
                                </>
                            ) : (
                                <>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                    </svg>
                                    <span>Out of Stock</span>
                                </>
                            )}
                        </p>
                    </div>

                    {/* Description */}
                    <div className="prose prose-indigo max-w-none bg-white p-6 rounded-xl shadow-md">
                        <div className="text-indigo-900" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(product?.description) }} />
                    </div>

                    {/* Features */}
                    <div className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl p-6 shadow-lg">
                        <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            Features
                        </h3>
                        <ul className="space-y-3">
                            {console.log(featuresList)
                            }
                            {featuresList.map((feature, index) => (
                                <li key={index} className="flex items-start">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white mr-2 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    <span className="text-white font-medium">{feature.trim()}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Add to Cart Button - Preserving original logic */}
                    <div className="mt-6" onClick={() => {
                        dispatch(addToCart({
                            productId, paddleProductId: product?.paddleProductId, paddlePriceId: product?.paddlePriceId, quantity: 1, title: product?.title, price: product?.price
                        }))
                    }}>
                        <button
                            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-4 rounded-xl shadow-lg hover:shadow-indigo-200 hover:from-indigo-700 hover:to-purple-700 transform hover:-translate-y-1 transition-all duration-300 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed disabled:shadow-none disabled:transform-none"
                            disabled={product.stock === 0 || addedProductQT >= product.stock}
                        >
                            {product.stock > 0 ? (
                                addedProductQT < product.stock ? (
                                    <>
                                        <span className="font-bold text-lg">Add To Cart</span>
                                        <CartIcon />
                                    </>
                                ) : <span className="font-bold text-lg">Cart Limit Reached</span>
                            ) : (
                                <span className="font-bold text-lg">Currently Unavailable</span>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductPage;
