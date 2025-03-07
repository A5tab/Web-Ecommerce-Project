import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice.js'
import cartReducer from '../features/cart/cartSlice.js'

export default configureStore({
    reducer: {
        auth: authReducer,
        cart: cartReducer,
    },
})