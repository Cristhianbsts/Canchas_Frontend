import "../css/home-card.css"
import { homeCart } from "../services/homeCart.js";
import noImage from "../assets/no-image.webp"
import { Link } from "react-router-dom";

const HomeCard = ({ product }) => {
    const { name, price, image, category, stock, _id } = product;

    const handleAdd = async () => {
    if (stock <= 0) return;

    const data = await homeCart.addProduct(_id, 1);

    if (data.ok) {
        console.log("Nuevo total del carrito:", data.cart.totalAmount);
        alert(`¡${name} agregado con éxito!`);
    } else {
        alert(data.message || "Error al agregar al carrito");
        if (data.message.includes("authenticación")) {
            window.location.href = '/login';
        }
    }};

    return (
        <Link to={`/producto/${_id}`} className="card-link-wrapper">
            <div className="card-container">
                <div className="image-wrapper">
                    <img src={image || noImage} alt={name} className="product-image" />
                    {stock > 0 && <span className="stock-badge">Stock disponible</span>}
                </div>
                <div className="card-content">
                    <h2 className="product-title" style={{ textTransform: 'capitalize' }}>{name}</h2>
                    <div className="category-tags">
                        <span className="tag">Deportivo</span>
                        <span className="tag">{category?.name || 'General'}</span>
                    </div>
                    <hr className="divider" />
                    <div className="card-footer">
                        <div className="price-section">
                            <p className="price-value">${price.toLocaleString('es-AR')}</p>
                            <p className="price-label">oferta</p>
                        </div>
                        <button style={stock <= 0 ? {backgroundColor: "gray"} : {}} className="add-button" onClick={handleAdd} disabled={stock <= 0}>
                            {stock > 0 ? 'Agregar' : 'Sin Stock'}
                        </button>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default HomeCard