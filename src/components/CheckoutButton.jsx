import { useCart } from "../hooks/useCart";
import { formatPrice } from "../utils/formatPrice";

function CartItem({ item }) {
  const { increaseItem, decreaseItem, removeItem } = useCart();

  return (
    <div className="card border-0 shadow-sm rounded-4 mb-3 cart-item-card">
      <div className="card-body p-3">
        <div className="row align-items-center g-3">
          <div className="col-12 col-md-2 text-center">
            <img
              src={item.image}
              alt={item.name}
              className="img-fluid rounded-4 cart-item-image"
            />
          </div>

          <div className="col-12 col-md-4">
            <h5 className="fw-bold mb-1 cart-item-title">{item.name}</h5>
            <p className="text-muted mb-1 small">{item.description || "Producto seleccionado"}</p>
            <p className="mb-0 fw-semibold text-success">{formatPrice(item.price)}</p>
          </div>

          <div className="col-6 col-md-3">
            <div className="quantity-box d-flex align-items-center justify-content-center gap-2">
              <button
                className="btn btn-light quantity-btn"
                onClick={() => decreaseItem(item._id)}
              >
                -
              </button>

              <span className="fw-bold">{item.quantity}</span>

              <button
                className="btn btn-light quantity-btn"
                onClick={() => increaseItem(item._id)}
              >
                +
              </button>
            </div>
          </div>

          <div className="col-6 col-md-3 text-md-end">
            <p className="fw-bold mb-2">{formatPrice(item.subtotal)}</p>
            <button
              className="btn btn-outline-danger rounded-pill px-3"
              onClick={() => removeItem(item._id)}
            >
              Eliminar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartItem;