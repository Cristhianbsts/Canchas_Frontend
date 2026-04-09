import { getFriendlyErrorMessage } from "../helpers/handleApiError";

const API_URL = `${import.meta.env.VITE_API_URL}/payment`;

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
    throw new Error(getFriendlyErrorMessage(response, data, "No se pudo iniciar el pago"));
  }

  return data;
};