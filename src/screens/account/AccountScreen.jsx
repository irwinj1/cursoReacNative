import React, { useState, useEffect } from "react";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { UserGuestScreen } from "./UserGuestScreen";
import { UserLoggedScreen } from "./UserLoggedScreen";
import { LoadingModal } from "../../components";

export default function AccountScreen() {
  const [hasLogged, setHasLogged] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setHasLogged(true);
      } else {
        setHasLogged(false);
      }
    });
  }, []);
  if (hasLogged == null) {
    return <LoadingModal isShow={true} text='Cargando...' />;
  }
  return hasLogged ? <UserLoggedScreen /> : <UserGuestScreen />;
}
