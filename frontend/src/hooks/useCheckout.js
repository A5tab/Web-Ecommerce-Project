import { useState, useEffect } from "react";
import { initializePaddle } from '@paddle/paddle-js';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const useCheckout = () => {
    const cartProducts = useSelector(state => state.cart.cartProducts);
    const auth = useSelector(state => state.auth);

    const [paddle, setPaddle] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        initializePaddle({ environment: "sandbox", token: "test_c7dd607a04ea6498ad89712ffc6" })
            .then(paddleInstance => {
                if (paddleInstance) {
                    setPaddle(paddleInstance);
                }
            })
            .catch(error => console.error("Paddle initialization error:", error));
    }, []);

    const handleCheckout = async () => {
        console.log("Cart Products:", cartProducts);

        if (!paddle) {
            console.error("Paddle is not initialized yet.");
            return;
        }

        if (!cartProducts || cartProducts.length === 0) {
            console.error("Cart is empty.");
            return;
        }

        const items = cartProducts.map(product => ({
            price_id: product.paddlePriceId,
            quantity: product.quantity || 1,
        }));

        try {
            paddle.Checkout.open({
                items: items,
                email: auth?.userData?.email,
                successCallback: data => {
                    console.log("Checkout successful:", data);
                    navigate("/checkout-success");
                },
                closeCallback: () => {
                    console.log("Checkout closed.");
                },
            });
        } catch (error) {
            console.error("Checkout error:", error);
        }
    };

    return handleCheckout;
};

export default useCheckout;
