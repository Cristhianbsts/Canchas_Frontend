const SUSPENDED_ACCOUNT_MESSAGE =
  "Tu cuenta se encuentra suspendida temporalmente. No puedes realizar compras en este momento. Por favor, contacta al administrador del sitio para más información.";

const UNAUTHORIZED_MESSAGE =
  "No tienes permisos para realizar esta acción en este momento. Si crees que es un error, contacta al administrador.";

const stringifyPayload = (data) => {
  if (!data) return "";
  if (typeof data === "string") return data.toLowerCase();
  try {
    return JSON.stringify(data).toLowerCase();
  } catch {
    return "";
  }
};

export const getFriendlyErrorMessage = (response, data, defaultMessage = "Error en la solicitud") => {
  const payloadText = stringifyPayload(data);
  const isUnauthorizedStatus = response?.status === 401 || response?.status === 403;
  const hasSuspensionHint =
    payloadText.includes("suspend") ||
    payloadText.includes("inactive") ||
    payloadText.includes("policy returned unauthorized");
  const hasUnauthorizedHint =
    payloadText.includes("unauthorized") || payloadText.includes("forbidden");
  const hasPolicyUnauthorizedHint =
    payloadText.includes("at least one policy returned unauthorized") ||
    payloadText.includes("policy returned unauthorized");

  if (isUnauthorizedStatus && (hasSuspensionHint || hasPolicyUnauthorizedHint || hasUnauthorizedHint)) {
    return SUSPENDED_ACCOUNT_MESSAGE;
  }

  if (isUnauthorizedStatus || hasUnauthorizedHint) {
    return UNAUTHORIZED_MESSAGE;
  }

  return data?.msg || data?.message || defaultMessage;
};

export { SUSPENDED_ACCOUNT_MESSAGE };
