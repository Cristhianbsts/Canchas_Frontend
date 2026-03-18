import React from "react";
import { useCartContext } from "../context/CartContext";
import "../css/addToCartButton.css";

function AddToCartButton({ product }) {
  const { addToCart, loadingCart } = useCartContext();

  const handleAddToCart = async () => {
    if (!product || !product._id) return;
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