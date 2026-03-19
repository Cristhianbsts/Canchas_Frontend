import { useCart } from "../hooks/useCart";
import { formatPrice } from "../helpers/formatPrice";
import CheckoutButton from "./CheckoutButton";
import "../css/cartSummary.css";

function CartSummary() {
  const { items, totalItems, totalPrice } = useCart();

  return (
    <div className="card border-0 shadow-sm rounded-4 cart-summary-card">
      <div className="card-body p-4">
        <h4 className="fw-bold mb-4">Resumen del pedido</h4>

        <div className="d-flex justify-content-between mb-2">
          <span className="text-muted">Productos</span>
          <span className="fw-semibold">{totalItems}</span>
        </div>

        <div className="d-flex justify-content-between mb-3">
          <span className="text-muted">Subtotal</span>
          <span className="fw-semibold">{formatPrice(totalPrice)}</span>
        </div>

        <hr />

        <div className="d-flex justify-content-between mb-4">
          <span className="fw-bold fs-5">Total</span>
          <span className="fw-bold fs-5 text-success">{formatPrice(totalPrice)}</span>
        </div>

        <CheckoutButton items={items} />
      </div>
    </div>
  );
}

export default CartSummary;