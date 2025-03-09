import { useSelector } from "react-redux";

const useCheckout = () => {
    const cartProducts = useSelector(state => state.cart.cartProducts);
    const auth = useSelector(state => state.auth);

    const handleCheckout = () => {

        console.log("cartP", cartProducts);
        console.log("auth:", auth);


    }

    return handleCheckout;
}


export default useCheckout;
