import React, { useEffect, useState } from "react";
import { View,ScrollView } from "react-native";
import { AccountUserOptions, AddInfoUser, InfoUser } from "../../../components/Account";
import { styles } from "./UserLoggedStyle";
import { Button } from "@rneui/base";
import { useNavigation,CommonActions } from "@react-navigation/native";
import {httpClient, isTokenExpire, refreshToken, removeToken, saveToken, screenName} from '../../../utils'
import { jwtDecode } from "jwt-decode";
import Toast from "react-native-toast-message";
import { LoadingModal } from "../../../components";

export function UserLoggedScreen({token}) {
  const [hasInformation,setHasInformation]=useState(false);
  const [hasLogged,setHasLogged]=useState(null);
  
  
  const navigation = useNavigation();
  useEffect(() => {
    setHasLogged(true)
    const dataDecode = jwtDecode(token); // Decodifica el token
    
    // Verifica la información del usuario
    if (dataDecode?.userInformation == null) {
     
      setHasInformation(true); // Actualiza el estado
    } else {
   
      setHasInformation(false); // Actualiza el estado
    }
    setHasLogged(false)
  }, [token]);
  
  const logout = async () => {
   try {
 
     if(token){
      const isValidToken = await isTokenExpire();
      if (isValidToken) {
        const refreshTokens=await refreshToken()
        await saveToken(refreshTokens)
      }
  
     }
     const response = await httpClient.post('/auth/logout');
   
     if (response.data.status == 200) {
      try {
        // Eliminar el token almacenado
      const respToken =  await removeToken();
      // console.log(respToken);
       
        
       if(respToken){
         // Mostrar mensaje de éxito
         Toast.show({
          text1: "Sesión cerrada",
          type: "success",
          position: "bottom",
        });
    
        // Navegar a la pantalla deseada
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: screenName.accounts.accounts }],
          }),
        )
       }
      } catch (error) {
        console.error('Error al cerrar sesión:', error);
    
        // Mensaje de error al usuario (opcional)
        Toast.show({
          text1: "Error al cerrar sesión",
          type: "error",
          position: "bottom",
        });
      }
    }
     // Navigate to Login screen
    // navigation.navigate(screenName.accounts.accounts);
   } catch (error) {
    
   }
    
  };
  if(hasLogged){
    return <LoadingModal /> // Mostrar el modal de carga durante la cierre de sesión
  }
  
  return (
    <ScrollView centerContent={true}  style={styles.content}>
      
      {hasInformation?<AddInfoUser />:<InfoUser />}

     {!hasInformation &&  <Button title="Cerrar sesión" buttonStyle={styles.btnStyle} titleStyle={styles.btnTextStyle} onPress={logout} />}
    </ScrollView>
  );
}
