import { useProducts } from "../../context/ProductsProvider";
import { useNavigate, Link } from "react-router-dom";
import DOMPurify from 'dompurify'
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
        <div className="py-10 my-6 px-4 sm:px-8 lg:px-16 bg-gradient-to-br from-[#6386f0] to-[#e8b0cb] rounded-2xl">
            {/* Category Title with accent */}
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-indigo-900 capitalize mb-2">{categoryName}</h2>
                <div className="h-1 w-20 bg-gradient-to-r from-amber-400 to-pink-500 rounded-full"></div>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {displayedProducts.map((product) => (
                    <Link
                        to={`/product/${product._id}`}
                        key={product._id}
                        className="group bg-white rounded-2xl overflow-hidden border-2 border-indigo-300 shadow-md hover:shadow-2xl hover:border-indigo-400 transform transition-transform duration-300 hover:-translate-y-2 flex flex-col"
                    >
                        {/* Accent Bar */}
                        <div className="h-2 bg-gradient-to-r from-indigo-500 to-purple-500"></div>

                        {/* Image */}
                        <div className="w-full h-56 relative overflow-hidden bg-gradient-to-br from-indigo-50 to-purple-50 group">
                            {/* Compact Price Tag */}
                            <div className="absolute top-2 right-2 bg-yellow-400 text-gray-900 font-bold px-2.5 py-0.5 rounded-full shadow-sm text-xs z-10 transform rotate-2">
                                ${product.price}
                            </div>

                            <div className="w-full h-full flex items-center justify-center p-2">
                                <img
                                    src={product.mainImage || "/placeholder.svg"}
                                    alt={product.title}
                                    className="w-[90%] h-[90%] object-contain transition-transform duration-500 group-hover:scale-110 mix-blend-multiply"
                                    style={{
                                        filter: "contrast(1.05) brightness(1.05)",
                                    }}
                                />
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-5 flex flex-col flex-grow">
                            <h3 className="text-xl font-semibold text-gray-800 mb-2 truncate">{product.title}</h3>
                            <div
                                className="text-gray-600 text-sm mb-4 line-clamp-2 flex-grow"
                                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(product?.description) }}
                            />
                        </div>
                    </Link>
                ))}
            </div>

            {/* Empty State */}
            {filteredProducts.length === 0 && (
                <div className="bg-white p-8 rounded-xl shadow-md text-center mt-8 border-l-4 border-indigo-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-indigo-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-lg text-indigo-900">
                        No products available in the <span className="capitalize font-semibold">{categoryName}</span> category.
                    </p>
                </div>
            )}

            {/* View All Button */}
            {filteredProducts.length > 6 && (
                <div className="mt-10 text-center">
                    <button
                        onClick={handleViewAll}
                        className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl shadow-lg hover:shadow-indigo-300 hover:from-indigo-700 hover:to-purple-700 transform hover:-translate-y-1 transition-all duration-300"
                    >
                        View All Products
                    </button>
                </div>
            )}
        </div>

    );
}

export default CategoryContainer;
