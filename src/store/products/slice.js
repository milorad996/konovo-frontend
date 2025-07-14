import { createSlice } from "@reduxjs/toolkit";

const middlewareActions = {
    getProducts() { },
    getFilteredProducts() { },
    getProduct() { },
};

const productsSlice = createSlice({
    name: "products",
    initialState: {
        page: {
            data: [],
            current_page: 0,
            last_page: 0,
            total: 0,
        },
        singleProduct: null,
    },
    reducers: {
        setProducts(state, { payload }) {
            state.page = {
                data: payload.data,
                current_page: payload.current_page,
                last_page: payload.last_page,
                total: payload.total,
            };
        },
        appendProducts(state, { payload }) {
            state.page = {
                ...payload,
                data: [...state.page.data, ...payload.data],
            };
        },
        setCurrentPage(state, { payload }) {
            state.page.current_page = payload;
        },
        setProduct(state, { payload }) {
            state.singleProduct = payload;
        },


        ...middlewareActions,
    },
});

export const {
    getProducts,
    setProducts,
    appendProducts,
    setCurrentPage,
    setProduct,
    getProduct,
} = productsSlice.actions;

export default productsSlice.reducer;
