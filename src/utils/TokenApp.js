import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import axios from "axios";

export const saveToken = async (token) =>{
    try {
       // console.log('token ',token);
       await AsyncStorage.setItem('token', token)
        const tokensSave = await getToken();
      if (tokensSave) {
        console.log(true);
        
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

export const refreshToken = async()=>{
    try {
        const response = await axios.post('http://10.175.160.10:8000/api/refresh', {}, {
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