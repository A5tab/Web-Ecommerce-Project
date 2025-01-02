import React, { useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { ProductsContext } from "../../context/ProductsProvider";

function CategoryPage() {
    const { categoryName } = useParams(); // Get the category name from URL
    const { products } = useContext(ProductsContext);

    // Filter products by category
    const filteredProducts = products.filter(
        (product) => product.category === categoryName
    );

    return (
        <div className="py-8 px-4 sm:px-8 lg:px-16">
            {/* Category Title */}
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 capitalize">
                {categoryName}
            </h2>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                    <Link
                        to={`/product/${product._id}`}
                        key={product._id}
                        className="bg-white shadow-md rounded-lg overflow-hidden transition transform hover:scale-105"
                    >
                        <img
                            src={product.mainImage}
                            alt={product.name}
                            className="w-full h-40 object-contain"
                        />
                        <div className="p-4">
                            <h3 className="text-lg font-medium text-gray-900 truncate">
                                {product.name}
                            </h3>
                            <p className="text-sm text-gray-500 mt-2 truncate">
                                {product.description}
                            </p>
                            <p className="text-lg font-semibold text-blue-600 mt-4">
                                ${product.price}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>

            {/* Empty State */}
            {filteredProducts.length === 0 && (
                <p className="text-gray-500 mt-4">
                    No products available in the <span className="capitalize">{categoryName}</span>{" "}
                    category.
                </p>
            )}
        </div>
    );
}

export default CategoryPage;
