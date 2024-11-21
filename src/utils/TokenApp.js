import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export const saveToken = async (token) =>{
    try {
      await removeToken();
       await AsyncStorage.setItem('token', token)
        const tokensSave = await getToken();
      if (tokensSave) {
       
        
        return true;
      }
       
        
        
    } catch (error) {
        Toast.show({
            text1: "Error al guardar el token",
            text2: error.message,
            type: "error",
            position: "bottom"
        })
    }
}

export const getToken = async () => {
    try {
        const value = await AsyncStorage.getItem('token');
        if(value !== null){
            return value;
        } else {
            return null;
        }
        
    } catch(error) {
        Toast.show({
            text1: "No has iniciado sesion aun",
            text2: error.message,
            type: "info",
            position: "bottom"
        })
    }
}
export const removeToken= async () => {
    try {
        await AsyncStorage.removeItem('token');
      
        return true;
    } catch (error) {
        
    }
};
export const isTokenExpire = async ()=>{
    try {
        const token = await AsyncStorage.getItem('token');
        if(token!== null){
            const decodedToken = jwtDecode(token);
            const currentTime = Date.now() / 1000;
            if(decodedToken.exp < currentTime){
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
        
    } catch(error) {
       logger.error(error);
    }

}
export const refreshToken = async()=>{
    try {
        const token = await getToken();
        const tokenDecode = jwtDecode(token)
        const response = await axios.post('http://10.175.160.10:8000/api/auth/refresh-token', {user_id:tokenDecode.user_id}, {
            headers: {
                'Authorization': `Bearer ${await getToken()}`, // Suponiendo que tu API espera el token actual para refrescarlo
            }
        });
        return response.data.token;
    } catch (error) {
        console.error("Error al refrescar el token:", error);
        throw error;
    }
}