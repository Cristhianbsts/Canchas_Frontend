const API_URL = import.meta.env.VITE_API_URL;

export const getProducts = async (limit = null) => {
  const url = limit ? `${API_URL}/products?limit=${limit}` : `${API_URL}/products`;
  const response = await fetch(url, { credentials: 'include' });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "No se pudieron cargar los productos");
  }

  return data.items || data.products || data.data || [];
};

export const getProductById = async (id) => {
  const products = await getProducts();
  const foundProduct = products.find((item) => item._id === id);

  if (!foundProduct) {
    throw new Error("Producto no encontrado");
  }

  return foundProduct;
};

export const saveProduct = async (id, data) => {
  const url = id ? `${API_URL}/products/${id}` : `${API_URL}/products`;
  const method = id ? 'PATCH' : 'POST';
  const response = await fetch(url, { method, body: data, credentials: 'include' });
  return await response.json();
};

export const deleteProduct = async (id) => {
  const response = await fetch(`${API_URL}/products/${id}`, { method: 'DELETE', credentials: 'include' });
  return await response.json();
};
