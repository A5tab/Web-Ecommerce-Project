import { createContext, useContext, useReducer } from "react"
export const ProductsContext = createContext();

const initialState = {
  products: [],
  loading: true,
  error: null
}

const productsReducer = (state, action) => {
  switch (action.type) {
    case "SET_PRODUCTS":
      return { ...state, products: action.payload, loading: false }
    case "ADD_PRODUCT":
      return { ...state, products: [...state.products, action.payload], loading: false, error: null }
    case "DELETE_PRODUCT":
      return { ...state, products: state.products.filter((product) => product._id !== action.payload), loading: false, error: null }
    case "UPDATE_PRODUCT":
      return { ...state, products: state.products.map((product) => (product._id === action.payload._id ? action.payload : product)), loading: false, error: null }
    case "SET_ERROR":
      return { ...state, error: action.payload, loading: false }
    default:
      return state
  }
}
export const AdminProductsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(productsReducer, initialState);

  return (
    <ProductsContext.Provider value={{ state, dispatch }}>
      {children}
    </ProductsContext.Provider>
  )
};

export const useAdminProducts = () => useContext(ProductsContext);