import { useCallback } from "react";
import { useSelector } from "react-redux";

const useProductAddedQT = () => {
    const cartProducts = useSelector(state => state.cart.cartProducts);

    const getProductQT = useCallback((productId) => {
        const product = cartProducts.find((p) => p.id === productId);
        return product ? product.quantity : 0;
    }, [cartProducts]);

    return getProductQT;
};

export default useProductAddedQT;
