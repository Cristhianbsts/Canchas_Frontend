const url = `${import.meta.env.VITE_API_URL}/fields`;

const getField = async (adminRequest = false) => {
  try {
    const opts = adminRequest ? { credentials: 'include' } : {};
    const response = await fetch(url, opts);
    const data = await response.json();
    return data.fields;
  } catch (error) {
    console.log(error);
  }
};

const saveField = async (id, data) => {
  const targetUrl = id ? `${url}/${id}` : url;
  const method = id ? 'PATCH' : 'POST';
  const response = await fetch(targetUrl, { method, body: data, credentials: 'include' });
  return await response.json();
};

const deleteField = async (id) => {
  const response = await fetch(`${url}/${id}`, { method: 'DELETE', credentials: 'include' });
  return await response.json();
};

export { getField, saveField, deleteField };
