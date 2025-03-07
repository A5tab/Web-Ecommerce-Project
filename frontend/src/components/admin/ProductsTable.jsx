import React, { useEffect, useState } from 'react';
import FormModel from './FormModel';
import { toast, ToastContainer } from 'react-toastify';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { useAdminProducts } from '../../context/AdminProductsProvider';
import useRefreshTokens from '../../hooks/useRefreshTokens';
function ProductsTable() {
    const { state, dispatch } = useAdminProducts();
    const axiosPrivate = useAxiosPrivate();
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [editModel, setEditModel] = useState(false);

    const refresh = useRefreshTokens();
    useEffect(() => {
        // const fetchProducts = async () => {
        //     try {
        //         const response = await axiosPrivate.get('/product/get-all-products');
        //         if (response.status === 200) {
        //             dispatch({ type: 'SET_PRODUCTS', payload: response.data.data });
        //         }
        //     } catch (error) {
        //         console.log(error);
        //         dispatch({ type: 'SET_ERROR', payload: error });
        //         navigate('/login', { state: { from: location }, replace: true })
        //     }
        // }

        fetchProducts();
    }, [])

    const fetchProducts = async () => {
        try {
            const response = await axiosPrivate.get('/product/get-all-products');
            if (response.status === 200) {
                dispatch({ type: 'SET_PRODUCTS', payload: response.data.data });
            }
        } catch (error) {
            console.log(error);
            dispatch({ type: 'SET_ERROR', payload: error });
        }
    }

    // useEffect(() => {
    //     let isMounted = true;
    //     const controller = new AbortController();

    //     const getProducts = async () => {
    //         try {
    //             const response = await axios.get('/product/get-all-products', {
    //                 signal: controller.signal,
    //             });

    //             if (response.status === 200) {
    //                 console.log("Products fetched:", response.data); // ✅ Check API response

    //                 if (isMounted) {
    //                     dispatch({ type: "SET_PRODUCTS", payload: response.data.data });
    //                 }
    //             }
    //         } catch (err) {
    //             console.error("Error fetching products:", err);

    //             // Check if navigation is blocking logs
    //             console.log("Navigating to login...");
    //             navigate('/login', { state: { from: location }, replace: true });
    //         }
    //     };

    //     getProducts();

    //     return () => {
    //         console.log("Cleanup running..."); // ✅ See if cleanup runs
    //         isMounted = false;
    //         controller.abort();
    //     };
    // }, []);


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
            const response = await axiosPrivate.delete(`/product/delete-products/${selectedProduct._id}`);
            dispatch({ type: "DELETE_PRODUCT", payload: selectedProduct._id });
            toast.success("Product deleted successfully!");
        } catch (error) {
            dispatch({ type: "SET_ERROR", payload: "Error deleting product" });
            toast.warn("Error deleting product. Please try again later.");
        } finally {
            setShowDeleteModal(false);
            setSelectedProduct(null);
            dispatch({ type: "SET_ERROR", payload: null });
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



    if (state.loading) return <p className="text-gray-500 font-bold">Loading...</p>;
    if (state.error) return <p className="text-red-500">{state.error}</p>;
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
                            {state.products.map((product) => (
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
            <ToastContainer />
        </div>
    );
}

export default ProductsTable;
