import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useMemo } from "react";
import { getProducts, setCurrentPage } from "../store/products/slice";
import { selectIsAuthenticated } from "../store/auth/selectors";
import { selectCurrentPage, selectLastPage, selectProducts } from "../store/products/selectors";
import ProductCard from "../components/ProductCard";
import "./../css/products.css";
import FilterBar from "../components/FilterBar";

function Products() {
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const dispatch = useDispatch();
    const products = useSelector(selectProducts);
    const currentPage = useSelector(selectCurrentPage);
    const lastPage = useSelector(selectLastPage);

    const [category, setCategory] = useState("");
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);

    const uniqueCategories = [
        "Računarske komponente",
        "Eksterni punjači, adapteri i baterije",
        "Laptopovi i oprema",
        "Torbe i rančevi",
        "Monitori",
    ];

    useEffect(() => {
        if (isAuthenticated) {
            dispatch(setCurrentPage(1));
        }
    }, [isAuthenticated, dispatch]);

    useEffect(() => {
        if (isAuthenticated && currentPage > 0) {
            setLoading(true);
            (async () => {
                try {
                    await dispatch(getProducts({ page: currentPage, category, search }));
                } finally {
                    setLoading(false);
                }
            })();
        }
    }, [isAuthenticated, currentPage, category, search, dispatch]);


    if (!isAuthenticated) {
        return <p>Prvo se morate ulogovati.</p>;
    }

    const handleFilter = ({ category, search }) => {
        setCategory(category);
        setSearch(search);
        dispatch(setCurrentPage(1));
    };

    const handleLoadMore = () => {
        if (currentPage < lastPage && !loading) {
            dispatch(setCurrentPage(currentPage + 1));
        }
    };

    return (
        <div className="products-page">
            <div className="filter-container">
                <FilterBar categories={uniqueCategories} onFilter={handleFilter} />
            </div>

            <div className="product-grid">
                {products?.data?.length === 0 ? (
                    <p>Nema dostupnih proizvoda.</p>
                ) : (
                    products?.data?.map((product) => (
                        <ProductCard key={product?.sku} product={product} />
                    ))
                )}
            </div>

            {currentPage < lastPage && (
                <div className="load-more-container">
                    <button
                        onClick={handleLoadMore}
                        disabled={loading}
                        className="load-more-btn"
                    >
                        {loading ? "Učitavanje..." : "Učitaj još"}
                    </button>
                </div>
            )}
        </div>
    );
}

export default Products;
