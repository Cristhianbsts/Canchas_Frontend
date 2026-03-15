import { Link } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import CartItem from "../components/CartItem";
import CartSummary from "../components/CartSummary";

function CartPage() {
  const { items, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="cart-page min-vh-100 py-5">
        <div className="container">
          <div className="empty-cart-box mx-auto text-center">
            <h2 className="fw-bold mb-3">Tu carrito está vacío</h2>
            <p className="text-muted mb-4">
              Todavía no agregaste productos o reservas.
            </p>

            <Link to="/" className="btn btn-success rounded-pill px-4 py-2">
              Volver a la tienda
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page min-vh-100 py-4 py-md-5">
      <div className="container">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
          <div>
            <h2 className="fw-bold mb-1">Tu carrito</h2>
            <p className="text-muted mb-0">Revisá tus productos antes de pagar</p>
          </div>

          <button
            className="btn btn-outline-danger rounded-pill px-4"
            onClick={clearCart}
          >
            Vaciar carrito
          </button>
        </div>

        <div className="row g-4">
          <div className="col-lg-8">
            {items.map((item) => (
              <CartItem key={item._id} item={item} />
            ))}
          </div>

          <div className="col-lg-4">
            <CartSummary />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;