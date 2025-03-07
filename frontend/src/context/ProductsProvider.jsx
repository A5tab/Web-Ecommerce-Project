import { createContext, useContext, useEffect, useReducer } from "react"
export const ProductsContext = createContext();
import axios from '../api/axios'
const initialState = {
    products: [],
    loading: true,
    error: null
}

const productsReducer = (state, action) => {
    switch (action.type) {
        case "SET_PRODUCTS":
            return { ...state, products: action.payload, loading: false };
        case "SET_ERROR":
            return { ...state, error: action.payload, loading: false };
        default:
            return state;
    }
};

export const ProductsProvider = ({ children }) => {
    const [state, dispatch] = useReducer(productsReducer, initialState);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get("/product/get-all-products");

                dispatch({ type: "SET_PRODUCTS", payload: response.data.data });
            } catch (error) {
                dispatch({ type: "SET_ERROR", payload: "Failed to fetch products" });
            }
        };

        fetchProducts();
    }, []);
    return (
        <ProductsContext.Provider value={{ state, dispatch }}>
            {children}
        </ProductsContext.Provider>
    )
};

export const useProducts = () => useContext(ProductsContext);