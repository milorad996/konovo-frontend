import HttpService from "./HttpService";

class ProductService extends HttpService {
    getAll = async (page = 1, category = null, search = null) => {
        const params = {};
        console.log("page in product service", page);
        if (page) params.page = page;
        if (category) params.category = category;
        if (search) params.search = search;

        const { data } = await this.client.get('/products', { params });

        return data;
    }
    getProduct = async (id) => {
        const { data } = await this.client.get(`/products/${id}`);
        return data;
    };




}

const productService = new ProductService();
export default productService;