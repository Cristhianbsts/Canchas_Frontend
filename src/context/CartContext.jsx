import { createContext, useContext, useEffect, useState } from "react";
import {
  getCartRequest,
  addProductToCartRequest,
  updateCartItemRequest,
  removeCartItemRequest,
  clearCartRequest,
} from "../services/cartService";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loadingCart, setLoadingCart] = useState(false);

  const resetCartState = () => {
    setItems([]);
    setTotalPrice(0);
  };

  const normalizeCart = (cart) => {
    const normalizedItems =
      cart?.items?.map((item) => ({
        _id: item.product?._id,
        name: item.product?.name,
        description: item.product?.description || "",
        image: item.product?.image || "/img/product-placeholder.jpg",
        price: item.product?.price || item.price || 0,
        quantity: item.quantity,
        subtotal: item.subtotal || ((item.product?.price || item.price || 0) * item.quantity),
        product: item.product, 
        stock: item.product?.stock || 0,
        category: item.product?.category || null,
      })) || [];

    setItems(normalizedItems);
    setTotalPrice(cart?.total || 0);
  };

  const loadCart = async () => {
    try {
      setLoadingCart(true);
      const data = await getCartRequest();
      normalizeCart(data.cart);
    } catch (error) {
      console.error("Error cargando carrito:", error.message);
      resetCartState();
    } finally {
      setLoadingCart(false);
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  const addToCart = async (product) => {
    try {
      setLoadingCart(true);

      const data = await addProductToCartRequest({
        product: product._id,
        quantity: 1,
      });

      normalizeCart(data.cart);
    } catch (error) {
      console.error("Error agregando al carrito:", error.message);
      alert(error.message);
    } finally {
      setLoadingCart(false);
    }
  };

  const increaseItem = async (productId) => {
    const item = items.find((i) => i._id === productId);
    if (!item) return;

    try {
      const data = await updateCartItemRequest(productId, item.quantity + 1);
      normalizeCart(data.cart);
    } catch (error) {
      console.error("Error aumentando cantidad:", error.message);
      alert(error.message);
    }
  };

  const decreaseItem = async (productId) => {
    const item = items.find((i) => i._id === productId);
    if (!item) return;

    if (item.quantity === 1) {
      await removeItem(productId);
      return;
    }

    try {
      const data = await updateCartItemRequest(productId, item.quantity - 1);
      normalizeCart(data.cart);
    } catch (error) {
      console.error("Error disminuyendo cantidad:", error.message);
      alert(error.message);
    }
  };

  const removeItem = async (productId) => {
    try {
      const data = await removeCartItemRequest(productId);
      normalizeCart(data.cart);
    } catch (error) {
      console.error("Error eliminando producto:", error.message);
      alert(error.message);
    }
  };

  const clearCart = async () => {
    try {
      await clearCartRequest();
      resetCartState();
    } catch (error) {
      console.error("Error vaciando carrito:", error.message);
      alert(error.message);
    }
  };

  return (
    <CartContext.Provider
      value={{
        items,
        totalPrice,
        loadingCart,
        loadCart,
        addToCart,
        increaseItem,
        decreaseItem,
        removeItem,
        clearCart,
        resetCartState,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => useContext(CartContext);
