import React, { useState, useEffect } from "react";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { UserGuestScreen } from "./UserGuestScreen";
import { UserLoggedScreen } from "./UserLoggedScreen";
import { LoadingModal } from "../../components";
import { getToken, refreshToken, saveToken } from "../../utils";


export default function AccountScreen() {
  const [hasLogged, setHasLogged] = useState(null);
  const [token,setToken]= useState(null);
  useEffect( () => {
   async function getTokens (){
    const token = await getToken()
   
      const refreshToke = await refreshToken();
     
      
     if (refreshToke) {
     
      
      await saveToken(refreshToke);
     }
   
     
      if (token != 'undefined' && token != null) {
console.log('token');

        setHasLogged(true);
        setToken(token);
      } else {
        setHasLogged(false);
        setToken(null);
      }
   }
   getTokens();
   
  }, []);
  if (hasLogged == null) {
    return <LoadingModal isShow={true} text='Cargando...' />;
  }
  
  return hasLogged ? <UserLoggedScreen token={token} /> : <UserGuestScreen />;
}
