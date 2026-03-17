const API_URL = "http://localhost:3002/api/payment";

export const createCartPaymentRequest = async () => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      type: "cart",
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.msg || "No se pudo iniciar el pago");
  }

  return data;
};