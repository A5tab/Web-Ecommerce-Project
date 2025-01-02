import React, { useContext } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { ProductsContext } from "../../context/ProductsProvider";
import axios from "axios";

function ProductPage() {
    const { productId } = useParams(); // Get the product ID from the URL
    const { products } = useContext(ProductsContext);

    const [qauntity, setQuantity] = useState(0)
    const handleAddQuantity = async function (e) {
        e.preventDefault();
        console.log(qauntity);
        try {
            const url = `http://localhost:3000/api/v1/product/add-qauntity/${product._id}`
            const method = "post"
            const response = await axios({
                method,
                url
            });
            window.location.reload();
        } catch (error) {
            console.error("Error submitting form:", error);
            alert("Failed to submit the form. Please try again.");
        }
    }
    const handleQuantityChange = function (e) {
        setQuantity(e.target.value);
    }
    // Safeguard: Ensure `products` is defined and is an array
    if (!products || !Array.isArray(products)) {
        return (
            <div className="py-8 px-4 sm:px-8 lg:px-16">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                    Loading...
                </h2>
                <p className="text-gray-500">Please wait while we fetch the product details.</p>
            </div>
        );
    }

    // Find the product by ID
    const product = products.find((p) => p._id?.toString() === productId);

    // Handle the case where the product is not found
    if (!product) {
        return (
            <div className="py-8 px-4 sm:px-8 lg:px-16">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                    Product Not Found
                </h2>
                <p className="text-gray-500">The product you are looking for does not exist.</p>
            </div>
        );
    }

    return (
        <div className="py-8 px-4 sm:px-8 lg:px-16">
            {/* Product Title */}
            <h1 className="text-3xl font-bold text-gray-800 mb-6">{product.title}</h1>

            {/* Product Images */}
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

                {/* Product Details */}
                <div>
                    <h2 className="text-2xl font-semibold text-gray-700 mb-4">Details</h2>
                    <p className="text-gray-600 text-lg mb-4">{product.description}</p>

                    {/* Features */}
                    <h3 className="text-lg font-medium text-gray-800 mb-2">Features:</h3>
                    <ul className="list-disc list-inside text-gray-600 mb-4">
                        {Array.isArray(product.features)
                            ? product.features.map((feature, index) => (
                                <li key={index}>{feature.trim()}</li>
                            ))
                            : product.features
                                ?.split(",")
                                .map((feature, index) => <li key={index}>{feature.trim()}</li>)}
                    </ul>

                    {/* Stock and Price */}
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

                    {/* Add to Cart Button */}
                    <button
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                        disabled={product.stock === 0}
                    >
                        {product.stock > 0 ? "Add to Cart" : "Unavailable"}
                    </button>

                    <form onSubmit={handleAddQuantity}>
                        <input type="text" value={qauntity} className="bg-red-300" onChange={handleQuantityChange} />
                        <button className="bg-yellow-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition" type="submit">
                            Add Quantity
                        </button>
                    </form>

                </div>
            </div>
        </div>
    );
}

export default ProductPage;
