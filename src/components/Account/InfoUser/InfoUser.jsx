import { View, Text } from "react-native";
import React, {useState,useEffect} from "react";
import { Avatar } from "@rneui/base";
import { getAuth } from "firebase/auth";
import { styles } from "./InfoUserStyle";
import * as ImagePicker from 'expo-image-picker';
import { getToken } from "../../../utils";
import { jwtDecode } from "jwt-decode";

export function InfoUser() {
 // const {uid,photoURL,displayName,email} = getAuth().currentUser;

 

 
  const [userInfo, setUserInfo] = useState(null);
  useEffect(() => {
    async function getTokens() {
      const token = await getToken();
      //console.log("Token recibido:", token);

      if (token) {
        try {
          const decoded = jwtDecode(token);
          //console.log("Información decodificada:", decoded);
          setUserInfo(decoded);
        } catch (error) {
          console.error("Error al decodificar el token:", error);
        }
      }
    }
    getTokens();
  }, []); 
  const changeAvatar = async ()=>{
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes:['images', 'videos'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      
      
      uploadImage(result.assets[0].uri);
    }
   
  
    // Actualizar la base de datos con el nuevo avatar
    // firebase.firestore().collection('users').doc(uid).update({ photoURL: avatar }); // Esto es un ejemplo, se debe adaptar a su base de datos.
    // En este ejemplo, se muestra un mensaje de log para mostrar que se cambió el avatar.
   
    
  }
  const uploadImage = (uri) => {
    console.log(uri);
    
  };

  return (
    <View style={styles.content}>
    
      <Avatar
        size="large"
        rounded
        containerStyle={styles.avatar}
        icon={{ type: "material", name: "person" }}
       // source={{ uri: photoURL }}
      >
        <Avatar.Accessory size={24} onPress={changeAvatar} />
      </Avatar>
      <View>
        <Text style={styles.displayName}>anonimous</Text>
        {/* <Text>{email}</Text> */}
      </View>
    </View>
  );
}
