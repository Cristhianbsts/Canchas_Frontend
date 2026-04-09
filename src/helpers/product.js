const API_URL = import.meta.env.VITE_API_URL;
const ALL_PRODUCTS_LIMIT = 1000;

export const isVisibleProduct = (product) =>
  Boolean(product && product._id && product.active !== false);

export const getProducts = async (limit = ALL_PRODUCTS_LIMIT, adminRequest = false) => {
  const resolvedLimit = Number.isFinite(limit) ? limit : ALL_PRODUCTS_LIMIT;
  const url = `${API_URL}/products?limit=${resolvedLimit}`;
  const opts = adminRequest ? { credentials: 'include' } : {};
  const response = await fetch(url, opts);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "No se pudieron cargar los productos");
  }

  return data.items || data.products || data.data || [];
};

export const getProductById = async (id) => {
  const products = await getProducts();
  const foundProduct = products.find((item) => item._id === id && isVisibleProduct(item));

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
