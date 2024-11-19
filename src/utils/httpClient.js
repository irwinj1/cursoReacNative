import axios from "axios";
import { getToken,refreshToken,saveToken } from "./TokenApp";



const httpClient = axios.create({
    baseURL:'http://10.175.160.10:8000/api',
    headers: {
        'Content-Type': 'application/json',
       //'Authorization': `Bearer ${token()}` // Replace with your actual token storage method
    }
});

httpClient.interceptors.request.use(
    async (config) => {
        try {
            const token = await getToken(); // Wait for the token to be retrieved
            if (token) {
                config.headers['Authorization'] = `Bearer ${token}`;
            }
        } catch (error) {
            console.error("Error retrieving token:", error);
        }
        return config;
    },
    (error)=>{
        console.error("Error en la petición", error);
        return Promise.reject(error);
    }
)
httpClient.interceptors.response.use(
    response => response, // Si la respuesta es exitosa, se devuelve directamente
    async (error) => {
        const originalRequest = error.config;

        // Si el error es 401 y el token ha expirado
        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            // Obtener un nuevo token usando el refresh token
            try {
                const newToken = await refreshToken(); // Función que hace la solicitud para refrescar el token
                if (newToken) {
                    // Actualiza el token en el almacenamiento
                    saveToken(newToken);

                    // Vuelve a intentar la solicitud original con el nuevo token
                    originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
                    return httpClient(originalRequest); // Vuelve a hacer la solicitud original
                }
            } catch (err) {
                console.error("Error al refrescar el token", err);
                return Promise.reject(err);
            }
        }

        return Promise.reject(error); // Si el error no es un 401 o no se puede refrescar, devuelve el error
    }
);
export {httpClient};