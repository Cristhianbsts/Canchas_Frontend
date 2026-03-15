import { useEffect, useState } from "react";
import { useCart } from "../hooks/useCart";
import "../css/cssRoot.css";
import "../css/cartView.css";

const CartView = () => {
  const { items, clearCart, loadingCart } = useCart();

  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [loadingRecommendations, setLoadingRecommendations] = useState(true);
  const [recommendationError, setRecommendationError] = useState("");

  useEffect(() => {
    const fetchRecommendedProducts = async () => {
      try {
        setLoadingRecommendations(true);
        setRecommendationError("");

        const response = await fetch("http://localhost:3002/api/products");
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "No se pudieron cargar productos");
        }

        const products = data.items || [];
        setRecommendedProducts(products.slice(0, 6));
      } catch (error) {
        console.error("Error en recomendados:", error);
        setRecommendationError(error.message || "Error cargando productos");
      } finally {
        setLoadingRecommendations(false);
      }
    };

    fetchRecommendedProducts();
  }, []);

  return (
    <main className="cart-view">
      <div className="container cart-container-custom">
        <section className="cart-header-custom">
          <div>
            <h1 className="cart-main-title">Tu carrito</h1>
            <p className="cart-main-subtitle">
              Vista de prueba para detectar el error.
            </p>
          </div>

          <button className="cart-clear-button" onClick={clearCart}>
            Vaciar carrito
          </button>
        </section>

        <section className="cart-main-panel">
          <div className="cart-panel-top">
            <h2 className="cart-panel-title">Diagnóstico</h2>
          </div>

          <div style={{ padding: "20px" }}>
            <p><strong>loadingCart:</strong> {String(loadingCart)}</p>
            <p><strong>items.length:</strong> {items?.length ?? "undefined"}</p>
            <pre style={{ fontSize: "12px", background: "#fff", padding: "12px", borderRadius: "8px", overflow: "auto" }}>
              {JSON.stringify(items, null, 2)}
            </pre>
          </div>
        </section>

        <section className="cart-recommendations-section">
          <div className="cart-recommendations-header">
            <h2 className="cart-recommendations-title">Recomendados</h2>
          </div>

          <div style={{ padding: "20px", background: "#fff", borderRadius: "12px" }}>
            <p><strong>loadingRecommendations:</strong> {String(loadingRecommendations)}</p>
            <p><strong>recommendationError:</strong> {recommendationError || "sin error"}</p>
            <p><strong>recommendedProducts.length:</strong> {recommendedProducts.length}</p>

            <pre style={{ fontSize: "12px", background: "#f8f8f8", padding: "12px", borderRadius: "8px", overflow: "auto" }}>
              {JSON.stringify(recommendedProducts, null, 2)}
            </pre>
          </div>
        </section>
      </div>
    </main>
  );
};

export default CartView;