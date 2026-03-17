import "../css/cssRoot.css";
import "../css/cartItem.css";
import { useCart } from "../hooks/useCart";

function CartItem({ item }) {
  const { increaseItem, decreaseItem, removeItem } = useCart();

  if (!item) return null;

  return (
    <div className="card cart-item-card mb-3">
      <div className="card-body d-flex align-items-center gap-3">
        <img
          src={item.image || "/img/product-placeholder.jpg"}
          alt={item.name || "Producto"}
          className="cart-item-image"
          onError={(e) => {
            e.currentTarget.src = "/img/product-placeholder.jpg";
          }}
        />

        <div className="flex-grow-1">
          <h6 className="cart-item-title">{item.name || "Producto"}</h6>
          <p className="text-muted mb-1">
            ${Number(item.price || 0).toLocaleString("es-AR")}
          </p>
          <small className="text-secondary">
            Subtotal: ${Number(item.subtotal || 0).toLocaleString("es-AR")}
          </small>
        </div>

        <div className="quantity-box d-flex align-items-center gap-2">
          <button
            className="btn btn-light quantity-btn"
            onClick={() => decreaseItem(item._id)}
          >
            -
          </button>

          <span>{item.quantity || 1}</span>

          <button
            className="btn btn-light quantity-btn"
            onClick={() => increaseItem(item._id)}
          >
            +
          </button>
        </div>

        <button
          className="btn btn-outline-danger"
          onClick={() => removeItem(item._id)}
        >
          x
        </button>
      </div>
    </div>
  );
}

export default CartItem;