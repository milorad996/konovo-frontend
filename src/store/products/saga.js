import { takeLatest, call, put } from "redux-saga/effects";
import productService from "../../services/ProductService";

import {
    getProducts,
    setProducts,
    appendProducts,
    getProduct,
    setProduct,
} from "./slice";

function* getProductsHandler({ payload }) {
    try {
        const page = payload?.page || 1;
        const category = payload?.category || null;
        const search = payload?.search || null;

        const response = yield call(productService.getAll, page, category, search);

        const transformed = {
            data: response.data,
            current_page: response.page,
            last_page: response.totalPages,
            total: response.total,
        };

        if (page > 1) {
            yield put(appendProducts(transformed));
        } else {
            yield put(setProducts(transformed));
        }
    } catch (e) {
        console.log(e);
    }
}










function* getProductHandler({ payload }) {
    try {
        const data = yield call(productService.getProduct, payload);
        yield put(setProduct(data));
    } catch (e) {
        console.log(e);
    }
}



export function* watchGetProducts() {
    yield takeLatest(getProducts.type, getProductsHandler);
}



export function* watchGetProduct() {
    yield takeLatest(getProduct.type, getProductHandler);
}


