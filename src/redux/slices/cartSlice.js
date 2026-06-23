import { createSlice } from "@reduxjs/toolkit";

const savedCart =
    JSON.parse(localStorage.getItem("cart")) || {
        items: [],
        coupon: null,
    };

const initialState = {
    items: savedCart.items || [],
    coupon: savedCart.coupon || null,
};

const saveCart = (state) => {
    localStorage.setItem(
        "cart",
        JSON.stringify({
            items: state.items,
            coupon: state.coupon,
        })
    );
};

const cartSlice = createSlice({
    name: "cart",

    initialState,

    reducers: {
        addToCart: (state, action) => {
            const existingItem = state.items.find(
                (item) => item.id === action.payload.id
            );

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.items.push({
                    ...action.payload,
                    quantity: 1,
                });
            }

            saveCart(state);
        },

        removeFromCart: (state, action) => {
            state.items = state.items.filter(
                (item) => item.id !== action.payload
            );

            saveCart(state);
        },

        increaseQuantity: (state, action) => {
            const item = state.items.find(
                (item) => item.id === action.payload
            );

            if (item) {
                item.quantity += 1;
            }

            saveCart(state);
        },

        decreaseQuantity: (state, action) => {
            const item = state.items.find(
                (item) => item.id === action.payload
            );

            if (item && item.quantity > 1) {
                item.quantity -= 1;
            }

            saveCart(state);
        },

        applyCoupon: (state, action) => {
            state.coupon = action.payload;

            saveCart(state);
        },

        removeCoupon: (state) => {
            state.coupon = null;

            saveCart(state);
        },

        clearCart: (state) => {
            state.items = [];
            state.coupon = null;

            saveCart(state);
        },
    },
});

export const {
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    applyCoupon,
    removeCoupon,
    clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;