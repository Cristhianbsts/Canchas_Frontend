import React, { useContext } from "react";
import { useCartContext } from "../context/CartContext";
import { UserContext } from "../context/UserContext";
import { useLocation, useNavigate } from "react-router-dom";
import "../css/addToCartButton.css";

function AddToCartButton({ product }) {
  const { addToCart, loadingCart } = useCartContext();
  const { user, loadUserData } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleAddToCart = async () => {
    if (!product || !product._id) return;

    const currentUser = user?._id ? user : await loadUserData();

    if (!currentUser?._id) {
      alert("Debes iniciar sesión para agregar productos al carrito");
      navigate("/login", { state: { from: location } });
      return;
    }

    await addToCart(product);
  };

  return (
    <button
      className="btn btn-success custom-add-btn w-100"
      onClick={handleAddToCart}
      disabled={!product || product.stock <= 0 || loadingCart}
    >
      <i className="bi bi-cart-plus me-2"></i>
      {product?.stock > 0 ? "Agregar al carrito" : "Sin stock"}
    </button>
  );
}

export default AddToCartButton;
