import { useSelector } from "react-redux";
import useAxiosPrivate from './useAxiosPrivate'
import { useNavigate } from "react-router-dom";
const useCheckout = () => {
    const cartProducts = useSelector(state => state.cart.cartProducts);

    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const handleCheckout = async () => {
        console.log("cartP", cartProducts);
        const response = await axiosPrivate.post('/checkout/create-checkout', {cartProducts}, {headers: {
            "Content-Type" : 'application/json'
        }});
        console.log(response);

        if (response.data.checkoutUrl) {
            navigate(`${response.data.checkoutUrl}`, { replace: true })
        } else {
            console.log('payment failed');
        }
    }

    return handleCheckout;
}


export default useCheckout;
