export const sendContactMessage = async (data) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/nodemailer`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        
        const result = await response.json();
        
        if (!response.ok) {
            const mappedErrors = result?.errors
                ? Object.values(result.errors)
                : [];

            return {
                success: false,
                message: result?.message || result?.error || "Error al enviar el mensaje",
                errors: mappedErrors,
            };
        }
        
        return {
            success: true,
            message: result?.message || "Mensaje enviado correctamente",
            result,
        };
    } catch (error) {
        console.error("Error de red:", error);
        throw new Error("No se pudo conectar con el servidor.");
    }
};
