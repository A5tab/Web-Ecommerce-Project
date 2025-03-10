import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartProducts: localStorage.getItem("carts")
            ? JSON.parse(localStorage.getItem("carts"))
            : [],
        cartTabClicked: false
    },
    reducers: {
        addToCart: (state, action) => {
            const { productId, paddleProductId, paddlePriceId, quantity, title, price } = action.payload;
            const indexProductId = state.cartProducts.findIndex((product) => product.id === productId);

            if (indexProductId >= 0) {
                state.cartProducts[indexProductId].quantity += quantity;
            } else {
                state.cartProducts.push({ id: productId, paddleProductId, paddlePriceId, quantity, title, price });
            }

            localStorage.setItem("carts", JSON.stringify(state.cartProducts));
        },
        changeQuantity: (state, action) => {
            const { productId, quantity } = action.payload;
            const indexProductId = state.cartProducts.findIndex((product) => product.id === productId);

            if (quantity > 0) {
                state.cartProducts[indexProductId].quantity = quantity;
            } else {
                state.cartProducts = state.cartProducts.filter((product) => (product.id !== productId));
            }

            localStorage.setItem("carts", JSON.stringify(state.cartProducts));
        },
        cartTabHandler: (state) => {
            state.cartTabClicked = !state.cartTabClicked;
        }
    }
});

export const { addToCart, changeQuantity, removeFromCart, cartTabHandler } = cartSlice.actions;
export default cartSlice.reducer;
