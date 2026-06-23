import {
    createSlice,
    createAsyncThunk,
} from "@reduxjs/toolkit";

import { getProducts } from "../../services/productService";

export const fetchProducts =
    createAsyncThunk(
        "products/fetchProducts",
        async () => {
            return await getProducts();
        }
    );

const localProducts =
    JSON.parse(
        localStorage.getItem("customProducts")
    ) || [];

const initialState = {
    products: localProducts,
    loading: false,
    error: null,
};

const productSlice = createSlice({
    name: "products",

    initialState,

    reducers: {
        addProduct: (state, action) => {
            const newProduct = {
                ...action.payload,
                id: Date.now(),
            };

            state.products.unshift(newProduct);

            localStorage.setItem(
                "customProducts",
                JSON.stringify(
                    state.products.filter(
                        (product) => product.id > 1000000000
                    )
                )
            );
        },

        updateProduct: (state, action) => {
            const index = state.products.findIndex(
                (product) =>
                    product.id === action.payload.id
            );

            if (index !== -1) {
                state.products[index] =
                    action.payload;

                localStorage.setItem(
                    "customProducts",
                    JSON.stringify(
                        state.products.filter(
                            (product) =>
                                product.id > 1000000000
                        )
                    )
                );
            }
        },

        deleteProduct: (state, action) => {
            state.products =
                state.products.filter(
                    (product) =>
                        product.id !== action.payload
                );

            localStorage.setItem(
                "customProducts",
                JSON.stringify(
                    state.products.filter(
                        (product) =>
                            product.id > 1000000000
                    )
                )
            );
        },
    },

    extraReducers: (builder) => {
        builder

            .addCase(
                fetchProducts.pending,
                (state) => {
                    state.loading = true;
                    state.error = null;
                }
            )

            .addCase(
                fetchProducts.fulfilled,
                (state, action) => {
                    state.loading = false;

                    const customProducts =
                        JSON.parse(
                            localStorage.getItem(
                                "customProducts"
                            )
                        ) || [];

                    state.products = [
                        ...customProducts,
                        ...action.payload,
                    ];
                }
            )

            .addCase(
                fetchProducts.rejected,
                (state) => {
                    state.loading = false;
                    state.error =
                        "Failed to fetch products";
                }
            );
    },
});

export const {
    addProduct,
    updateProduct,
    deleteProduct,
} = productSlice.actions;

export default productSlice.reducer;