import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import useCheckout from '../hooks/useCheckout';
function CheckoutPage() {
    const cartProducts = useSelector(state => state.cart.cartProducts) || [];
    const totalAmount = cartProducts.reduce((sum, product) => sum + (product.price * product.quantity), 0);
    const handleCheckout = useCheckout();

    return (
        <div className="bg-[#0D1117] min-h-screen p-6 text-white">
            <div className="max-w-4xl mx-auto bg-[#161B22] p-6 rounded-lg shadow-lg border border-[#2c7bd4]">
                <h1 className="text-2xl font-bold text-amber-500 mb-4">Checkout</h1>
                <div>
                    {cartProducts.length > 0 ? (
                        <div>
                            <div className="flex justify-between text-yellow-400 font-bold border-b py-3 px-4">
                                <span className="w-1/3 text-left">Title</span>
                                <span className="w-1/3 text-center">Quantity</span>
                                <span className="w-1/3 text-right">Price</span>
                            </div>

                            {cartProducts.map(product => (
                                <div key={product.id} className="flex justify-between text-white border-b py-3 px-4">
                                    <span className="w-1/3 text-left">{product.title}</span>
                                    <span className="w-1/3 text-center">{product.quantity}</span>
                                    <span className="w-1/3 text-right">${product.price}</span>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center">
                            <p className="text-gray-500">Your cart is empty.</p>
                            <button className="text-amber-500 mt-2 underline">Shop with Us</button>
                        </div>
                    )}
                </div>
                <div className="mt-4 text-lg font-semibold text-amber-500">
                    Total: ${totalAmount.toFixed(2)}
                </div>
                <button
                    onClick={handleCheckout}
                    className="mt-6 bg-amber-500 text-black px-4 py-2 rounded-md hover:bg-amber-500 w-full font-bold">
                    Proceed to Payment
                </button>
            </div>
        </div>
    );
}

export default CheckoutPage;
