import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function useFetch() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const realizarPeticion = async (url) => {
        setLoading(true);
        try {
            const response = await fetch(url);
            if (response.status === 404) {
                navigate('/error-404'); 
                return;
            }
            if (!response.ok) {
                throw new Error("Ocurrió un error inesperado");
            }
            const data = await response.json();
            setLoading(false);
            return data;
        } catch (error) {
            console.error("Error en la petición:", error);
            setLoading(false);
        }
    };
    return { realizarPeticion, loading };
}

