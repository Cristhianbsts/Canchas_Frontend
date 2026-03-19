const API_URL = import.meta.env.VITE_API_URL;

export const getCategories = async () => {
    const response = await fetch(`${API_URL}/categories`, { credentials: 'include' });
    return await response.json();
};

export const saveCategory = async (id, data) => {
    const url = id ? `${API_URL}/categories/${id}` : `${API_URL}/categories`;
    const method = id ? 'PATCH' : 'POST';
    const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        credentials: 'include'
    });
    return await response.json();
};

export const deleteCategory = async (id) => {
    const response = await fetch(`${API_URL}/categories/${id}`, { method: 'DELETE', credentials: 'include' });
    return await response.json();
};
