import { getFriendlyErrorMessage } from "./handleApiError";

const url = `${import.meta.env.VITE_API_URL}/login`
const LOGOUT_FLAG_KEY = "auth:manual_logout";

const getRegisterMessage = (data, fallbackMessage) => {
  if (Array.isArray(data?.msg) && data.msg.length > 0) {
    return data.msg.map((error) => error.msg).join("\n");
  }

  if (typeof data?.msg === "string") {
    return data.msg;
  }

  if (typeof data?.message === "string") {
    return data.message;
  }

  return fallbackMessage;
};


const logIn = async (email, password) => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    return {
      ...data,
      ok: false,
      message: getFriendlyErrorMessage(response, data, data?.msg || data?.message || "Error al iniciar sesión")
    };
  }

  if (response.ok && data?.ok !== false) {
    localStorage.removeItem(LOGOUT_FLAG_KEY);
  }

  return data;
};

const getProfile = async () => {
  const response = await fetch(`${url}/profile`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
      Pragma: "no-cache",
    },
    credentials: "include",
    cache: "no-store",
  });

  const data = await response.json();
  return { ok: response.ok, data };
};

const registerUser = async (userData) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  let data = {};

  try {
    data = await response.json();
  } catch {
    data = {};
  }

  return {
    ...data,
    ok: Boolean(response.ok && (data.ok ?? true)),
    status: response.status,
    message: getRegisterMessage(
      data,
      response.ok ? "Usuario creado con exito" : "Error al crear el usuario"
    ),
  };
};

export { logIn, getProfile, registerUser };
