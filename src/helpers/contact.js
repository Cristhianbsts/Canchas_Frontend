export const sendContactMessage = async (data) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/contact`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        
        const result = await response.json();
        
        if (!response.ok) {
            return { success: false, errors: result.errores };
        }
        
        return { success: true, result };
    } catch (error) {
        console.error("Error de red:", error);
        throw new Error("No se pudo conectar con el servidor.");
    }
};
