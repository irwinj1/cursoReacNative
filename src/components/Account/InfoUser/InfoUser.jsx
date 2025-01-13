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
import { AccountUserOptions } from "./AccountUserOptions";


export function InfoUser() {

 const navigation = useNavigation();

 
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(false);
 
  const validTokenUsers = async()=>{
    const isValidToken = await isTokenExpire();

      if (isValidToken) {
        const refreshTokens=await refreshToken()
        await saveToken(refreshTokens)
      }
  }
  const infoUserData = async ()=>{
    try {
      setLoading(true);
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
  const getInfoUser = async()=>{
    try {
     
      console.log('aqui');
      
      await infoUserData();
    } catch (error) {
      console.log(error);
      
    }
  }
  useEffect(() => {
    async function dataUser() {
      try {
        setLoading(true);
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
    try {
      setLoading(true);
      await validTokenUsers()
   
     const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, // Solo imágenes
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true, // 
     })
          

      uploadImage(result.assets[0].base64)
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
    }
   } catch (error) {
    console.error(error);
    
   }finally{
    setLoading(false);
 
   }

  };
 

  if (loading) {
    <LoadingModal />
  }
  return userInfo ? (
    <>
    <View style={styles.content}>
      {/* Avatar con posibilidad de cambiar */}
      <Avatar
        size="large"
        rounded
        containerStyle={styles.avatar}
        icon={{ type: "material", name: "person" }}
        source={{ uri: userInfo?.image_url }}
      >
        <Avatar.Accessory size={24} onPress={changeAvatar} />
      </Avatar>
  
      {/* Información del usuario */}
      <View>
        <Text style={styles.displayName}>
        {[
          userInfo?.first_name,
          userInfo?.second_name,
          userInfo?.third_name,
          userInfo?.first_last_name,
          userInfo?.second_last_name,
          userInfo?.married_name,
        ]
          .filter((name) => name && name.trim() !== "") 
          .join(" ")}{" "}
          {/* <Icon
            type="material-community"
            name="pencil"
            size={20}
            iconStyle={{ color:'#a6a6a6'}}
            onPress={openModalName}
          /> */}
        </Text>
        <Text>
          {userInfo?.user?.email}{" "}
          {/* <Icon
            type="material-community"
            name="pencil"
            size={20}
            iconStyle={{ color:'#a6a6a6'}}
            onPress={openModalEmail}
          /> */}
        </Text>
     
      </View>
      
      {/* Diálogo para actualizar nombre */}
      {/* <Dialog isVisible={nameUserDialog}>
        <Dialog.Title title="Actualizar nombre" />
        <View>
          <EditUserName userInfo={userInfo} />
        </View>
        <Dialog.Actions>
          <Button
            onPress={() => setNameUserDialog(false)}
            title="Actualizar"
            type="outline"
            titleStyle={{ color: "#00a680", marginHorizontal: 20 }}
            buttonStyle={styles.buttonStyleDialog}
            containerStyle={styles.buttonDialog}
          />
        </Dialog.Actions>
      </Dialog> */}
  
      {/* Diálogo para actualizar correo */}
      {/* <Dialog isVisible={emailUserDialog}>
        <EditUserEmail
          userEmail={userInfo?.user?.email}
          setEmailUserDialog={setEmailUserDialog}
        />
      </Dialog> */}
    </View>
    <View>
    <AccountUserOptions getInfoUser={getInfoUser}  />
    </View>
    </>

  ) : (
    <LoadingModal />
  );
}
