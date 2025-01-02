import React, { useContext, useState } from 'react';
import { ProductsContext } from '../../context/ProductsProvider';
import axios from 'axios';
import FormModel from './FormModel';

function ProductsTable() {
    const { products, setProducts } = useContext(ProductsContext);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [editModel, setEditModel] = useState(false);

    // Toggle edit model
    const handleEditModel = (product) => {
        setSelectedProduct(product);
        setEditModel(true);
    };

    // Show confirmation modal for delete
    const handleDeleteModel = (product) => {
        setSelectedProduct(product);
        setShowDeleteModal(true);
    };

    // Handle delete confirmation
    const handleConfirmDelete = async () => {
        if (!selectedProduct) return;

        try {
            await axios.delete(`http://localhost:3000/api/v1/product/delete-products/${selectedProduct._id}`);
            setProducts((prevProducts) =>
                prevProducts.filter((product) => product._id !== selectedProduct._id)
            );
            alert("Product deleted successfully.");
        } catch (error) {
            console.error("Error deleting product:", error);
            alert("Failed to delete the product. Please try again.");
        } finally {
            setShowDeleteModal(false);
            setSelectedProduct(null);
        }
    };

    // Handle cancel delete
    const handleCancelDelete = () => {
        setShowDeleteModal(false);
        setSelectedProduct(null);
    };

    // Close edit model
    const handleCloseEditModel = () => {
        setEditModel(false);
        setSelectedProduct(null);
    };

    return (
        <div>
            {/* Display FormModel if editModel is true */}
            {editModel ? (
                <FormModel handleFormModel={handleCloseEditModel} product={selectedProduct} />
            ) : (
                <div>
                    <table className="min-w-full bg-white rounded-lg shadow">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="py-2 px-4 text-left">Product Title</th>
                                <th className="py-2 px-4 text-left">Product Image</th>
                                <th className="py-2 px-4 text-left">Category</th>
                                <th className="py-2 px-4 text-left">Price</th>
                                <th className="py-2 px-4 text-left">Stock</th>
                                <th className="py-2 px-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product._id}>
                                    <td className="py-2 px-4">{product?.title}</td>
                                    <td className="py-2 px-4">
                                        <img
                                            src={product?.images[0]}
                                            className="w-12 h-12"
                                            alt={`${product?.title} - Image`}
                                        />
                                    </td>
                                    <td className="py-2 px-4">{product?.category}</td>
                                    <td className="py-2 px-4">{product?.price}</td>
                                    <td className="py-2 px-4">{product?.stock}</td>
                                    <td className="py-2 px-4 text-right">
                                        <button
                                            className="bg-blue-500 text-white py-1 px-2 rounded mr-2"
                                            onClick={() => handleEditModel(product)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="bg-red-500 text-white py-1 px-2 rounded"
                                            onClick={() => handleDeleteModel(product)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Delete Confirmation Modal */}
                    {showDeleteModal && (
                        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                            <div className="bg-white p-6 rounded shadow-lg">
                                <h2 className="text-lg font-bold mb-4">Confirm Deletion</h2>
                                <p>Are you sure you want to delete this product?</p>
                                <div className="flex justify-end mt-4">
                                    <button
                                        className="bg-gray-300 text-gray-800 py-1 px-3 rounded mr-2"
                                        onClick={handleCancelDelete}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        className="bg-red-500 text-white py-1 px-3 rounded"
                                        onClick={handleConfirmDelete}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default ProductsTable;
