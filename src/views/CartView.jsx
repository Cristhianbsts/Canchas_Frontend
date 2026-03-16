import { useEffect, useMemo, useState } from "react";
import { useCart } from "../hooks/useCart";
import { createCartPaymentRequest } from "../services/paymentService";
import "../css/cssRoot.css";
import "../css/cartView.css";

const CartView = () => {
  const { items = [], clearCart, loadingCart } = useCart();

  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [loadingRecommendations, setLoadingRecommendations] = useState(true);
  const [recommendationError, setRecommendationError] = useState("");
  const [loadingPayment, setLoadingPayment] = useState(false);

  useEffect(() => {
    const fetchRecommendedProducts = async () => {
      try {
        setLoadingRecommendations(true);
        setRecommendationError("");

        const response = await fetch("http://localhost:3002/api/products");
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "No se pudieron cargar los productos");
        }

        const products = data.items || data.products || data || [];
        setRecommendedProducts(
          Array.isArray(products) ? products.slice(0, 6) : []
        );
      } catch (error) {
        console.error("Error en recomendados:", error);
        setRecommendationError(error.message || "Error cargando productos");
      } finally {
        setLoadingRecommendations(false);
      }
    };

    fetchRecommendedProducts();
  }, []);

  const total = useMemo(() => {
    return items.reduce((acc, item) => {
      const subtotal =
        Number(item?.subtotal) ||
        (Number(item?.price) || 0) * (Number(item?.quantity) || 0);

      return acc + subtotal;
    }, 0);
  }, [items]);

  const totalProducts = useMemo(() => {
    return items.reduce((acc, item) => acc + (Number(item?.quantity) || 0), 0);
  }, [items]);

  const formatPrice = (value) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      maximumFractionDigits: 0,
    }).format(Number(value) || 0);
  };

  const handleCheckout = async () => {
    try {
      setLoadingPayment(true);

      const data = await createCartPaymentRequest();

      if (!data?.url) {
        throw new Error("Mercado Pago no devolvió una URL de pago");
      }

      // Redirección a la pasarela de pago
      window.location.href = data.url;
    } catch (error) {
      console.error("Error iniciando pago:", error);
      alert(error.message || "No se pudo iniciar el pago");
    } finally {
      setLoadingPayment(false);
    }
  };

  if (loadingCart) {
    return (
      <main className="cart-view">
        <div className="cart-page-shell">
          <section className="cart-loading-box">
            <h1>Tu carrito</h1>
            <p>Cargando productos...</p>
          </section>
        </div>
      </main>
    );
  }

  return (
    <main className="cart-view">
      <div className="cart-page-shell">
        <header className="cart-topbar">
          <div>
            <h1 className="cart-page-title">Carrito de compras</h1>
            <p className="cart-page-subtitle">
              Revisá tus productos y continuá con el pago.
            </p>
          </div>

          {items.length > 0 && (
            <button className="cart-clear-button" onClick={clearCart}>
              Vaciar carrito
            </button>
          )}
        </header>

        <div className="cart-layout">
          <section className="cart-left-column">
            <div className="cart-section-card">
              <div className="cart-section-header">
                <h2>Productos</h2>
                <span>
                  {totalProducts} {totalProducts === 1 ? "unidad" : "unidades"}
                </span>
              </div>

              {items.length === 0 ? (
                <div className="cart-empty-state">
                  <h3>Tu carrito está vacío</h3>
                  <p>Cuando agregues productos, los vas a ver acá.</p>
                </div>
              ) : (
                <div className="cart-items-list">
                  {items.map((item, index) => {
                    const product = item.product || {};
                    const title = product.name || item.name || "Producto sin nombre";
                    const image =
                      product.image || item.image || product.images?.[0] || "";
                    const quantity = Number(item.quantity) || 0;
                    const price = Number(item.price) || 0;
                    const subtotal = Number(item.subtotal) || price * quantity;

                    return (
                      <article
                        className="cart-item-card"
                        key={product._id || item._id || index}
                      >
                        <div className="cart-item-image-box">
                          {image ? (
                            <img
                              src={image}
                              alt={title}
                              className="cart-item-image"
                            />
                          ) : (
                            <div className="cart-item-image-placeholder">
                              Sin imagen
                            </div>
                          )}
                        </div>

                        <div className="cart-item-main">
                          <div className="cart-item-main-top">
                            <h3 className="cart-item-title">{title}</h3>
                            <p className="cart-item-price">{formatPrice(price)}</p>
                          </div>

                          <div className="cart-item-meta">
                            <span>Cantidad: {quantity}</span>
                            <span>Subtotal: {formatPrice(subtotal)}</span>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              )}
            </div>

            <section className="cart-recommendations-card">
              <div className="cart-section-header">
                <h2>También te puede interesar</h2>
              </div>

              {loadingRecommendations ? (
                <div className="cart-info-box">
                  <p>Cargando recomendados...</p>
                </div>
              ) : recommendationError ? (
                <div className="cart-info-box">
                  <p>{recommendationError}</p>
                </div>
              ) : recommendedProducts.length === 0 ? (
                <div className="cart-info-box">
                  <p>No hay productos recomendados disponibles.</p>
                </div>
              ) : (
                <div className="cart-recommendations-grid">
                  {recommendedProducts.map((product, index) => {
                    const image = product.image || product.images?.[0] || "";
                    const name = product.name || "Producto";
                    const price = Number(product.price) || 0;

                    return (
                      <article
                        className="cart-recommendation-item"
                        key={product._id || index}
                      >
                        <div className="cart-recommendation-image-wrap">
                          {image ? (
                            <img
                              src={image}
                              alt={name}
                              className="cart-recommendation-image"
                            />
                          ) : (
                            <div className="cart-recommendation-placeholder">
                              Sin imagen
                            </div>
                          )}
                        </div>

                        <div className="cart-recommendation-body">
                          <h3>{name}</h3>
                          <p>{formatPrice(price)}</p>
                        </div>
                      </article>
                    );
                  })}
                </div>
              )}
            </section>
          </section>

          <aside className="cart-summary-column">
            <div className="cart-summary-card">
              <h2 className="cart-summary-title">Resumen de compra</h2>

              <div className="cart-summary-line">
                <span>Productos</span>
                <span>{totalProducts}</span>
              </div>

              <div className="cart-summary-line">
                <span>Envío</span>
                <span className="cart-shipping-free">A coordinar</span>
              </div>

              <div className="cart-summary-divider"></div>

              <div className="cart-summary-total">
                <span>Total</span>
                <strong>{formatPrice(total)}</strong>
              </div>

              <button
                className="cart-checkout-button"
                onClick={handleCheckout}
                disabled={items.length === 0 || loadingPayment}
              >
                {loadingPayment ? "Redirigiendo..." : "Continuar compra"}
              </button>

              <p className="cart-summary-note">
                Pago seguro y protección para tu compra.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
};

export default CartView;