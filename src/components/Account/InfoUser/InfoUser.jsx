import { View, Text } from "react-native";
import React, {useState,useEffect} from "react";
import { Avatar, Image } from "@rneui/base";
import { styles } from "./InfoUserStyle";
import { getToken, httpClient, isTokenExpire, refreshToken, saveToken, screenName } from "../../../utils";
import { jwtDecode } from "jwt-decode";
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { CommonActions, useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker"
import { LoadingModal } from "../../Shared";
import { Icon,Dialog, Input, Button } from "@rneui/themed";
import {EditUserName,EditUserEmail} from '../EditUserAccount'


export function InfoUser() {
 // const {uid,photoURL,displayName,email} = getAuth().currentUser;

 const navigation = useNavigation();

 
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [nameUserDialog, setNameUserDialog] = useState(false);
  const [emailUserDialog, setEmailUserDialog] = useState(false);
  const validTokenUsers = async()=>{
    const isValidToken = await isTokenExpire();
    console.log(isValidToken);
    
      if (isValidToken) {
        const refreshTokens=await refreshToken()
        await saveToken(refreshTokens)
      }
  }
  const infoUserData = async ()=>{
    try {
      await validTokenUsers()
      const response = await httpClient.get('/users/profile')
      
      
      
    if (response) {
      setUserInfo(response.data?.data)
    }
      
    } catch (error) {
      console.error(error);
      
    }finally{
      setLoading(false);
    }
  }
  useEffect(() => {
    async function dataUser() {
      try {
        await infoUserData();
      } catch (error) {
        console.error(error);
      }finally {
        setLoading(false);
      }
    }
    dataUser();
  }, []); 
  const changeAvatar = async ()=>{
   
    
    // const options = {
    //   mediaType: 'photo', // Puedes usar 'photo' para imágenes o 'video' para videos
    //   includeBase64: true, // Incluye la imagen en formato Base64 en el resultado
    //   selectionLimit: 1, // Número máximo de imágenes a seleccionar, 0 para ilimitado
    //   quality: 1, // Calidad de la imagen (1 = máxima calidad)
    // };
    try {
      setLoading(true);
      await validTokenUsers()
    //   const result = await launchImageLibrary(options, (response) => {
    //     if (response.didCancel) {
    //       console.log('Usuario canceló la selección de la imagen.');
    //     } else if (response.errorCode) {
    //       console.error('Error al seleccionar la imagen:', response.errorMessage);
    //     } else {
    //       console.log('Imagen seleccionada:');
    //     }
    //   });
     const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, // Solo imágenes
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true, // 
     })
          
    //  const base64String = await RNFS.readFile(result.assets[0].uri, 'base64');
    //  const base64Uri = `data:image/jpeg;base64,${base64String}`;
      uploadImage(result.assets[0].base64)
     // console.log(result); // Si quieres manejar el resultado fuera del callback
    } catch (error) {
      console.error('Error al abrir la galería:', error);
    }
    
  }
  const uploadImage = async (baseImage) => {
   try {
    
    const response = await httpClient.post('/users/save-photo-perfil',{image: baseImage})
    
    if(response.status == 200){
      
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: screenName.accounts.accounts }],
         
        })
      )
     // await infoUserData()
    }
   } catch (error) {
    console.error(error);
    
   }finally{
    setLoading(false);
 
   }

  };
  const openModalName=async ()=>{
    
    setNameUserDialog(!nameUserDialog)
  }

  const openModalEmail=async ()=>{
    setEmailUserDialog(!emailUserDialog)
  }

  if (loading) {
    <LoadingModal />
  }
  return (
    <View style={styles.content}>
    
      <Avatar
        size="large"
        rounded
        containerStyle={styles.avatar}
        icon={{ type: "material", name: "person" }}
       source={{ uri: userInfo?.image_url }}
      >
        <Avatar.Accessory size={24} onPress={changeAvatar} />
      </Avatar>
      
      <View>
        <Text style={styles.displayName}>{userInfo?.first_name} {userInfo?.first_last_name} 
          <Icon  type="material-community" name="pencil" size="medium" onPress={openModalName} /></Text>
        <Text>{userInfo?.user?.email} <Icon  type="material-community" name="pencil" size="medium" onPress={openModalEmail} /></Text>
      </View>
      <Dialog isVisible={nameUserDialog}  >
        <Dialog.Title title="Actualizar nombre" />
        <View>
         <EditUserName userInfo={userInfo} />
        </View>
        <Dialog.Actions>
          {/* <Button onPress={() => setNameUserDialog(false)} title="Cerrar" type="outline" titleStyle={{ color: '#ff3409', marginHorizontal: 20 }} buttonStyle={{borderColor:'#ff3409'}} containerStyle={styles.buttonDialog} /> */}
          <Button onPress={() => setNameUserDialog(false)} title="Actualizar" type="outline" titleStyle={{ color: '#00a680', marginHorizontal: 20 }}  buttonStyle={styles.buttonStyleDialog} containerStyle={styles.buttonDialog} />
          {/* <Dialog.Button title="Cancelar" onPress={() => setNameUserDialog(false)} />
          <Dialog.Button title="Actualizar" onPress={() => setNameUserDialog(false)} /> */}
        </Dialog.Actions>
      </Dialog>
      <Dialog isVisible={emailUserDialog}  >
        <Dialog.Title title="Actualizar email" />
        <View>
            <EditUserEmail userInfo={userInfo?.user?.email} />
        </View>
        <Dialog.Actions>
          <Button onPress={() => setEmailUserDialog(false)} title="Cerrar" type="outline" titleStyle={{ color: '#ff3409', marginHorizontal: 20 }} buttonStyle={{borderColor:'#ff3409'}} containerStyle={styles.buttonDialog} />
          {/* <Button onPress={() => setEmailUserDialog(false)} title="Actualizar" type="outline" titleStyle={{ color: '#00a680', marginHorizontal: 20 }}  buttonStyle={styles.buttonStyleDialog} containerStyle={styles.buttonDialog} /> */}
          {/* <Dialog.Button title="Cancelar" onPress={() => setNameUserDialog(false)} />
          <Dialog.Button title="Actualizar" onPress={() => setNameUserDialog(false)} /> */}
        </Dialog.Actions>
      </Dialog>
    </View>
  );
}
