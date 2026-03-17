const url = "http://localhost:3002/api/logout";

const logOut = async () => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", // Importante para enviar la cookie HttpOnly
  });

  const data = await response.json();
  return { ok: response.ok, data };
};

export { logOut };
