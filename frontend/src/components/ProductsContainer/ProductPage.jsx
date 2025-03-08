import React from "react";
import { useParams } from "react-router-dom";
import { useProducts } from "../../context/ProductsProvider";
import CartIcon from '../CartIcon'
import { useDispatch } from "react-redux";
import { addToCart } from '../../features/cart/cartSlice.js'
import DOMPurify from 'dompurify';
function ProductPage() {
    const { productId } = useParams();
    const dispatch = useDispatch();
    const { state: { products = [], loading } } = useProducts();

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

    const featuresList = Array.isArray(product.features)
        ? product.features
        : product.features?.split(",") || [];

    return (
        <div className="py-8 px-4 sm:px-8 lg:px-16">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">{product.title}</h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                    <img
                        src={product.mainImage}
                        alt={product.title}
                        className="w-full h-96 object-contain rounded-lg shadow-md"
                    />
                    <div className="flex gap-4 mt-4 overflow-x-auto">
                        {product.images.map((img, index) => (
                            <img
                                key={index}
                                src={img}
                                alt={`${product.title} ${index + 1}`}
                                className="h-24 w-24 object-cover rounded-md shadow-md"
                            />
                        ))}
                    </div>
                </div>

                <div>
                    <h2 className="text-2xl font-semibold text-gray-700 mb-4">Details</h2>
                    <div className="text-gray-600 text-lg mb-4 prose max-w-none" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(product?.description) }} />
                    <h3 className="text-lg font-medium text-gray-800 mb-2">Features:</h3>
                    <ul className="list-disc list-inside text-gray-600 mb-4">
                        {featuresList.map((feature, index) => (
                            <li key={index}>{feature.trim()}</li>
                        ))}
                    </ul>

                    <div className="mb-4">
                        <p className="text-lg text-gray-700">
                            <strong>Price:</strong> ${product.price}
                        </p>
                        <p
                            className={`text-lg font-medium ${product.stock > 0 ? "text-green-600" : "text-red-600"
                                }`}
                        >
                            {product.stock > 0
                                ? `In Stock (${product.stock} available)`
                                : "Out of Stock"}
                        </p>
                    </div>

                    <div onClick={() => {
                        dispatch(addToCart({
                            productId, quantity: 1, title: product?.title, price: product?.price
                        }))
                    }}>
                        <button
                            className="flex items-center gap-2 bg-amber-500 text-white px-5 py-2 rounded-lg shadow-md hover:bg-amber-600 transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
                            disabled={product.stock === 0}
                        >
                            {product.stock > 0 ? (
                                <>
                                    <span className="font-medium">Add To Cart</span>
                                    <CartIcon />
                                </>
                            ) : (
                                <span className="font-medium">Unavailable</span>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductPage;
