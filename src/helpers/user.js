const API_URL = "http://localhost:3002/api/users";

const getUsers = async () => {
  try {
    const response = await fetch(API_URL, {
      method: "GET",
      credentials: "include",
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Error al obtener usuarios");
    }

    return data;
  } catch (error) {
    console.log("getUsers error:", error);
    return { ok: false, message: error.message };
  }
};

const activateUser = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}/activate`, {
      method: "PATCH",
      credentials: "include",
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Error al activar usuario");
    }

    return data;
  } catch (error) {
    console.log("activateUser error:", error);
    return { ok: false, message: error.message };
  }
};

const suspendUser = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}/suspend`, {
      method: "PATCH",
      credentials: "include",
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Error al suspender usuario");
    }

    return data;
  } catch (error) {
    console.log("suspendUser error:", error);
    return { ok: false, message: error.message };
  }
};

export { getUsers, activateUser, suspendUser };