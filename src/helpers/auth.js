const BASE_URL = `${import.meta.env.VITE_API_URL}`;
const url = `${BASE_URL}/login`;


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
  return data;
};

const getProfile = async () => {
  const response = await fetch(`${BASE_URL}/profile`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  const data = await response.json();
  return { ok: response.ok, data };
};

export { logIn, getProfile };