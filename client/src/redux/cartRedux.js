import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  isCartOpen: false,
  cart: [],
  products: [],
}

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },

    addToCart: (state, action) => {
      state.cart = [...state.cart, action.payload.product];
    },

    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((product) => product._id !== action.payload._id);
    },

    increaseCount: (state, action) => {
      state.cart = state.cart.map((product) => {
        if (product._id === action.payload._id) {
          product.count++;
        }
        return product;
      });
    },

    decreaseCount: (state, action) => {
      state.cart = state.cart.map((product) => {
        if (product._id === action.payload._id && product.count > 1) {
          product.count--;
        }
        return product;
      });
    },

    setIsCartOpen: (state) => {
      state.isCartOpen = !state.isCartOpen;
    },
  },
});

export const {
  setProducts,
  addToCart,
  removeFromCart,
  increaseCount,
  decreaseCount,
  setIsCartOpen,
} = cartSlice.actions

export default cartSlice.reducer;