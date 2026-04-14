import { getFriendlyErrorMessage } from "../helpers/handleApiError";

const API_URL = `${import.meta.env.VITE_API_URL}/payment`;
const MERCADO_PAGO_UNAVAILABLE_MESSAGE =
  "La integracion de pagos con Mercado Pago aun no se encuentra disponible. Por favor, contacta al administrador para coordinar la compra.";

const getPaymentFriendlyMessage = (data) => {
  const backendMessage = data?.msg || data?.message || "";

  if (/hay productos inv[aá]lidos en el carrito/i.test(backendMessage)) {
    return MERCADO_PAGO_UNAVAILABLE_MESSAGE;
  }

  return null;
};

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
    const paymentFriendlyMessage = getPaymentFriendlyMessage(data);

    if (paymentFriendlyMessage) {
      throw new Error(paymentFriendlyMessage);
    }

    throw new Error(getFriendlyErrorMessage(response, data, "No se pudo iniciar el pago"));
  }

  return data;
};

export { MERCADO_PAGO_UNAVAILABLE_MESSAGE };
