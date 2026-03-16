import { useEffect, useMemo, useState } from "react";
import { useCart } from "../hooks/useCart";
import { createCartPaymentRequest } from "../services/paymentService";
import "../css/cartView.css";

const API_URL = "http://localhost:3002/api";

const CartView = () => {
  const { items = [], clearCart, loadingCart } = useCart();

  const [cartItems, setCartItems] = useState([]);
  const [loadingAction, setLoadingAction] = useState(false);
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [loadingRecommendations, setLoadingRecommendations] = useState(true);
  const [recommendationError, setRecommendationError] = useState("");
  const [loadingPayment, setLoadingPayment] = useState(false);

  useEffect(() => {
    setCartItems(items);
  }, [items]);

  const fetchCart = async () => {
    try {
      const response = await fetch(`${API_URL}/cart`, {
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "No se pudo obtener el carrito");
      }

      setCartItems(data?.cart?.items || []);
    } catch (error) {
      console.error("Error refrescando carrito:", error);
    }
  };

  useEffect(() => {
    const fetchRecommendedProducts = async () => {
      try {
        setLoadingRecommendations(true);
        setRecommendationError("");

        const response = await fetch(`${API_URL}/products`);
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
    return cartItems.reduce((acc, item) => {
      const product = item?.product || {};
      const quantity = Number(item?.quantity) || 0;
      const price = Number(product?.price) || Number(item?.price) || 0;
      const subtotal = Number(item?.subtotal) || price * quantity;

      return acc + subtotal;
    }, 0);
  }, [cartItems]);

  const totalProducts = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + (Number(item?.quantity) || 0), 0);
  }, [cartItems]);

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

      window.location.href = data.url;
    } catch (error) {
      console.error("Error iniciando pago:", error);
      alert(error.message || "No se pudo iniciar el pago");
    } finally {
      setLoadingPayment(false);
    }
  };

  const handleIncrease = async (productId, currentQuantity, stock) => {
    try {
      const nextQuantity = currentQuantity + 1;

      if (typeof stock === "number" && nextQuantity > stock) {
        alert("No hay más stock disponible");
        return;
      }

      setLoadingAction(true);

      const response = await fetch(`${API_URL}/cart/${productId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ quantity: nextQuantity }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "No se pudo aumentar la cantidad");
      }

      setCartItems(data?.cart?.items || []);
    } catch (error) {
      console.error("Error aumentando cantidad:", error);
      alert(error.message || "No se pudo aumentar la cantidad");
    } finally {
      setLoadingAction(false);
    }
  };

  const handleDecrease = async (productId, currentQuantity) => {
    try {
      if (currentQuantity <= 1) {
        await handleRemoveItem(productId);
        return;
      }

      setLoadingAction(true);

      const response = await fetch(`${API_URL}/cart/${productId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ quantity: currentQuantity - 1 }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "No se pudo disminuir la cantidad");
      }

      setCartItems(data?.cart?.items || []);
    } catch (error) {
      console.error("Error disminuyendo cantidad:", error);
      alert(error.message || "No se pudo disminuir la cantidad");
    } finally {
      setLoadingAction(false);
    }
  };

  const handleRemoveItem = async (productId) => {
    try {
      setLoadingAction(true);

      const response = await fetch(`${API_URL}/cart/${productId}`, {
        method: "DELETE",
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "No se pudo eliminar el producto");
      }

      setCartItems(data?.cart?.items || []);
    } catch (error) {
      console.error("Error eliminando producto:", error);
      alert(error.message || "No se pudo eliminar el producto");
    } finally {
      setLoadingAction(false);
    }
  };

  const handleClearCart = async () => {
    try {
      setLoadingAction(true);
      await clearCart();
      await fetchCart();
    } catch (error) {
      console.error("Error vaciando carrito:", error);
      alert("No se pudo vaciar el carrito");
    } finally {
      setLoadingAction(false);
    }
  };

  if (loadingCart) {
    return (
      <main className="py-5 bg-light min-vh-100">
        <div className="container">
          <div className="card shadow-sm border-0 rounded-4">
            <div className="card-body p-4">
              <h2 className="fw-bold mb-2">Tu carrito</h2>
              <p className="text-muted mb-0">Cargando productos...</p>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="py-4 py-md-5 bg-light min-vh-100">
      <div className="container">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-start gap-3 mb-4">
          <div>
            <h1 className="fw-bold mb-2">Carrito de compras</h1>
            <p className="text-muted mb-0">
              Revisá tus productos y continuá con el pago.
            </p>
          </div>

          {cartItems.length > 0 && (
            <button
              className="btn btn-outline-primary fw-semibold px-4 py-2"
              onClick={handleClearCart}
              disabled={loadingAction}
            >
              {loadingAction ? "Procesando..." : "Vaciar carrito"}
            </button>
          )}
        </div>

        <div className="row g-4">
          <div className="col-12 col-lg-8">
            <div className="card border-0 shadow-sm rounded-4 overflow-hidden mb-4">
              <div className="card-header bg-white border-bottom py-3 px-4 d-flex justify-content-between align-items-center">
                <h2 className="h3 fw-bold mb-0">Productos</h2>
                <span className="text-muted fw-semibold">
                  {totalProducts} {totalProducts === 1 ? "unidad" : "unidades"}
                </span>
              </div>

              <div className="card-body p-0">
                {cartItems.length === 0 ? (
                  <div className="p-4 text-center">
                    <h3 className="h5 fw-bold">Tu carrito está vacío</h3>
                    <p className="text-muted mb-0">
                      Cuando agregues productos, los vas a ver acá.
                    </p>
                  </div>
                ) : (
                  cartItems.map((item, index) => {
                    const product = item.product || {};
                    const productId = product._id || item.productId || item._id;
                    const title = product.name || item.name || "Producto sin nombre";
                    const image =
                      product.image ||
                      product.images?.[0] ||
                      item.image ||
                      "";
                    const quantity = Number(item.quantity) || 0;
                    const price =
                      Number(product.price) || Number(item.price) || 0;
                    const subtotal =
                      Number(item.subtotal) || price * quantity;
                    const stock = Number(product.stock);

                    return (
                      <div
                        key={productId || index}
                        className="border-bottom px-3 px-md-4 py-4"
                      >
                        <div className="row g-3 align-items-center">
                          <div className="col-12 col-sm-4 col-md-3">
                            <div className="cart-thumb-wrapper">
                              {image ? (
                                <img
                                  src={image}
                                  alt={title}
                                  className="cart-thumb img-fluid"
                                />
                              ) : (
                                <div className="cart-thumb-placeholder">
                                  Sin imagen
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="col-12 col-sm-8 col-md-9">
                            <div className="d-flex flex-column gap-3">
                              <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-start gap-3">
                                <div>
                                  <h3 className="h3 h-md-4 fw-bold mb-2">{title}</h3>
                                  <p className="cart-price-unit mb-0">
                                    {formatPrice(price)}
                                  </p>
                                </div>

                                <button
                                  className="btn btn-outline-danger fw-semibold"
                                  onClick={() => handleRemoveItem(productId)}
                                  disabled={loadingAction}
                                >
                                  Eliminar
                                </button>
                              </div>

                              <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
                                <div className="d-inline-flex align-items-center gap-2 cart-qty-group">
                                  <button
                                    className="btn btn-light border fw-bold cart-qty-btn"
                                    onClick={() =>
                                      handleDecrease(productId, quantity)
                                    }
                                    disabled={loadingAction}
                                  >
                                    -
                                  </button>

                                  <span className="fw-bold fs-5 px-2">
                                    {quantity}
                                  </span>

                                  <button
                                    className="btn btn-light border fw-bold cart-qty-btn"
                                    onClick={() =>
                                      handleIncrease(productId, quantity, stock)
                                    }
                                    disabled={loadingAction}
                                  >
                                    +
                                  </button>
                                </div>

                                <div className="text-md-end">
                                  <p className="fw-bold mb-1">
                                    Subtotal: {formatPrice(subtotal)}
                                  </p>
                                  {Number.isFinite(stock) && (
                                    <small className="text-muted">
                                      Stock disponible: {stock}
                                    </small>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
              <div className="card-header bg-white border-bottom py-3 px-4">
                <h2 className="h3 fw-bold mb-0">También te puede interesar</h2>
              </div>

              <div className="card-body p-3 p-md-4">
                {loadingRecommendations ? (
                  <div className="text-center py-4">
                    <p className="text-muted mb-0">Cargando recomendados...</p>
                  </div>
                ) : recommendationError ? (
                  <div className="text-center py-4">
                    <p className="text-danger mb-0">{recommendationError}</p>
                  </div>
                ) : recommendedProducts.length === 0 ? (
                  <div className="text-center py-4">
                    <p className="text-muted mb-0">
                      No hay productos recomendados disponibles.
                    </p>
                  </div>
                ) : (
                  <div className="row g-3">
                    {recommendedProducts.map((product, index) => {
                      const image = product.image || product.images?.[0] || "";
                      const name = product.name || "Producto";
                      const price = Number(product.price) || 0;

                      return (
                        <div
                          className="col-12 col-sm-6 col-lg-4"
                          key={product._id || index}
                        >
                          <div className="card h-100 border rounded-4 shadow-sm">
                            <div className="cart-reco-image-wrap">
                              {image ? (
                                <img
                                  src={image}
                                  alt={name}
                                  className="cart-reco-image img-fluid"
                                />
                              ) : (
                                <div className="cart-reco-placeholder">
                                  Sin imagen
                                </div>
                              )}
                            </div>

                            <div className="card-body">
                              <h3 className="h6 fw-bold mb-2">{name}</h3>
                              <p className="fw-bold fs-5 mb-0">
                                {formatPrice(price)}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="col-12 col-lg-4">
            <div className="card border-0 shadow-sm rounded-4 sticky-lg-top cart-summary-card">
              <div className="card-body p-4">
                <h2 className="fw-bold mb-4">Resumen de compra</h2>

                <div className="d-flex justify-content-between mb-3">
                  <span className="text-muted">Productos</span>
                  <span className="fw-semibold">{totalProducts}</span>
                </div>

                <div className="d-flex justify-content-between mb-3">
                  <span className="text-muted">Envío</span>
                  <span className="text-success fw-bold">A coordinar</span>
                </div>

                <hr />

                <div className="d-flex justify-content-between align-items-center mb-4">
                  <span className="fs-5">Total</span>
                  <strong className="display-6 fw-bold mb-0">
                    {formatPrice(total)}
                  </strong>
                </div>

                <button
                  className="btn btn-primary w-100 fw-bold py-3 rounded-4"
                  onClick={handleCheckout}
                  disabled={
                    cartItems.length === 0 || loadingPayment || loadingAction
                  }
                >
                  {loadingPayment ? "Redirigiendo..." : "Continuar compra"}
                </button>

                <p className="text-muted small mt-3 mb-0">
                  Pago seguro y protección para tu compra.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CartView;