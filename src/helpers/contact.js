const CONTACT_ENDPOINTS = [
    `${import.meta.env.VITE_API_URL}/nodemailer`,
    "/api/nodemailer",
    "https://canchasbackend.vercel.app/api/nodemailer",
];

const getUniqueEndpoints = () => {
    return [...new Set(CONTACT_ENDPOINTS.filter(Boolean))];
};

const parseResponse = async (response) => {
    const text = await response.text();

    if (!text) return {};

    try {
        return JSON.parse(text);
    } catch {
        return {
            message: text,
        };
    }
};

export const sendContactMessage = async (data) => {
    const endpoints = getUniqueEndpoints();
    let lastFailure = null;

    for (const endpoint of endpoints) {
        try {
            const response = await fetch(endpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            const result = await parseResponse(response);

            if (response.ok) {
                return {
                    success: true,
                    message: result?.message || "Mensaje enviado correctamente",
                    result,
                };
            }

            const mappedErrors = result?.errors
                ? Object.values(result.errors)
                : [];

            lastFailure = {
                success: false,
                message: result?.message || result?.error || "Error al enviar el mensaje",
                errors: mappedErrors,
                status: response.status,
            };

            const shouldRetry =
                response.status === 404 &&
                typeof lastFailure.message === "string" &&
                lastFailure.message.includes("Ruta no encontrada");

            if (!shouldRetry) {
                return lastFailure;
            }
        } catch (error) {
            console.error(`Error de red en ${endpoint}:`, error);
            lastFailure = {
                success: false,
                message: "No se pudo conectar con el servidor.",
                errors: [],
            };
        }
    }

    return (
        lastFailure || {
            success: false,
            message: "No se pudo enviar el mensaje.",
            errors: [],
        }
    );
};
