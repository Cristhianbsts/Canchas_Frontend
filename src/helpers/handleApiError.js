export const getFriendlyErrorMessage = (response, data, defaultMessage = "Error en la solicitud") => {
  const isUnauthorized = response.status === 401 || response.status === 403;
  
  const hasUnauthorizedMessage = 
    data?.msg?.includes("UNAUTHORIZED") || 
    data?.message?.includes("UNAUTHORIZED") ||
    data?.msg?.toLowerCase().includes("suspend") ||
    data?.message?.toLowerCase().includes("suspend");

  if (isUnauthorized || hasUnauthorizedMessage) {
    return "Tu cuenta se encuentra suspendida temporalmente. No puedes realizar compras en este momento. Por favor, contacta al administrador del sitio para más información.";
  }

  return data?.msg || data?.message || defaultMessage;
};
