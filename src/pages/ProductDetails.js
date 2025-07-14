import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProduct } from "../store/products/slice";
import { selectProduct } from "../store/products/selectors";
import "./../css/productDetails.css";

function ProductDetails() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const product = useSelector(selectProduct);

    useEffect(() => {
        if (id) {
            dispatch(getProduct(id));
        }
    }, [id, dispatch]);

    if (!product) {
        return <div className="loading">Učitavanje proizvoda...</div>;
    }

    return (
        <div className="product-details-container">
            <div className="product-image-section">
                <img src={product?.imgsrc} alt={product?.naziv} className="product-image" />
            </div>

            <div className="product-info-section">
                <h1 className="product-title">{product?.naziv}</h1>

                <p className="product-price">{product?.price?.toFixed(2)} RSD</p>

                <p className="product-description" dangerouslySetInnerHTML={{ __html: product?.description }} />

                <ul className="product-meta">
                    <li><strong>SKU:</strong> {product?.sku}</li>
                    <li><strong>Kategorija:</strong> {product?.categoryName || "Nepoznato"}</li>
                    <li><strong>Na stanju:</strong> {product?.stock}</li>
                    <li><strong>EAN:</strong> {product?.ean || "Nema"}</li>
                    <li><strong>Brend:</strong> {product?.brandName || "Nepoznato"}</li>
                    <li><strong>PDV:</strong> {product?.vat}%</li>
                </ul>
            </div>
        </div>
    );
}

export default ProductDetails;
