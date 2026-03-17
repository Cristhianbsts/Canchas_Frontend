const API_URL = "http://localhost:3002/api/cart";

export const getCartRequest = async () => {
  const response = await fetch(API_URL, {
    method: "GET",
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Error al obtener carrito");
  }

  return data;
};

export const addProductToCartRequest = async ({ product, quantity = 1 }) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      product,
      quantity,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Error al agregar producto al carrito");
  }

  return data;
};

export const updateCartItemRequest = async (productId, quantity) => {
  const response = await fetch(`${API_URL}/${productId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ quantity }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Error al actualizar carrito");
  }

  return data;
};

export const removeCartItemRequest = async (productId) => {
  const response = await fetch(`${API_URL}/${productId}`, {
    method: "DELETE",
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Error al eliminar producto");
  }

  return data;
};

export const clearCartRequest = async () => {
  const response = await fetch(API_URL, {
    method: "DELETE",
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Error al vaciar carrito");
  }

  return data;
};