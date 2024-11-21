
import axios from "axios";
import { Base_url } from './config';
import { getToken,isTokenExpire,refreshToken,saveToken } from "./TokenApp";

// const ensureValidToken = async () => {
//     try {
//         const isValid = await isTokenExpire();
//         if (!isValid) {
//             const refreshTokens = await refreshToken();
//             await saveToken(refreshTokens);
//         }
//     } catch (error) {
//         console.error("Error validating or refreshing token:", error);
//     }
// };

const httpClient = axios.create({
    baseURL:Base_url,
    headers: {
        'Content-Type': 'application/json',
       //'Authorization': `Bearer ${token()}` // Replace with your actual token storage method
    }
});

httpClient.interceptors.request.use(
    async (config) => {
        try {
           // await ensureValidToken()
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


export {httpClient};