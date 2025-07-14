import { useNavigate } from 'react-router-dom';
import './../css/productCard.css';

function ProductCard({ product }) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/product-details/${product?.sku}`);
    };

    return (
        <div className="product-card" onClick={handleClick}>
            <div className="product-card-image">
                <img
                    src={product.imgsrc}
                    alt={product.naziv}
                    onError={(e) => e.target.src = "/placeholder.jpg"}
                />
            </div>
            <div className="product-card-body">
                <h3 className="product-card-name">{product.naziv}</h3>
                <p className="product-card-description">
                    {product.description?.replace(/<[^>]+>/g, '').slice(0, 100)}...
                </p>
                <p className="product-card-price">
                    {parseFloat(product.price).toFixed(2)} RSD
                </p>
            </div>
        </div>
    );
}

export default ProductCard;
