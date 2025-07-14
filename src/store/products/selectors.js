export function selectProducts(state) {
    return state.products.page || [];
}
export function selectCurrentPage(state) {
    return state.products?.page?.current_page;
}
export function selectLastPage(state) {
    return state.products?.page?.last_page;
}
export function selectProduct(state) {
    return state.products.singleProduct;
}


