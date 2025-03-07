import { useProducts } from "../../context/ProductsProvider";
import { useNavigate, Link } from "react-router-dom";
function CategoryContainer({ categoryName }) {
    const { state: { products } } = useProducts();
    const navigate = useNavigate();

    const filteredProducts = products.filter(
        (product) => product.category === categoryName
    );

    const displayedProducts = filteredProducts.slice(0, 6);

    const handleViewAll = () => {
        navigate(`/category/${categoryName}`);
    };

    return (
        <div className="py-8 px-4 sm:px-8 lg:px-16">
            {/* Category Title */}
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 capitalize">
                {categoryName}
            </h2>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayedProducts.map((product) => (
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
                            <p className="text-lg font-bold text-green-600 mt-4">
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

            {/* "View All" Button */}
            {filteredProducts.length > 6 && (
                <div className="mt-6 text-center">
                    <button
                        onClick={handleViewAll}
                        className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition"
                    >
                        View All
                    </button>
                </div>
            )}
        </div>
    );
}

export default CategoryContainer;
