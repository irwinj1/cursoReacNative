import { View, Text } from "react-native";
import React from "react";
import { styles } from "./AddInfoUserStyle";
import { Button, Input } from "@rneui/base";
import { useFormik } from "formik";
import { inicialValues, validationSchema } from "./AddInfoUser.data";
import { getToken, httpClient, isTokenExpire, saveToken, screenName } from "../../../../utils";
import { jwtDecode } from "jwt-decode";
import { CommonActions, useNavigation } from "@react-navigation/native";

export function AddInfoUser() {
  const navigator = useNavigation();
  const formik = useFormik({
    initialValues: inicialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (values) => {
        const validToken = await isTokenExpire()
       
        
        if(validToken){
            const refreshToken = await httpClient.post('/auth/refresh-token',{user_id:dataDecode.user_id});
            await saveToken(refreshToken.data.token);
        }
      let dataUser = {};
      if(values.firstName !=''){
        dataUser.first_name = values.firstName;
      }
      if(values.secondName!= ''){
        dataUser.second_name = values.secondName;
      }
      if(values.thirdName!= ''){
        dataUser.third_name = values.thirdName;
      }
      if(values.firstLastName!= ''){
        dataUser.first_last_name = values.firstLastName;
      }
      if(values.secondLastName!= ''){
        dataUser.second_last_name = values.secondLastName;
      }
      if(values.marriedName!= ''){
        dataUser.married_name = values.marriedName;
      }
      if(values.phoneNumber!= ''){
        dataUser.phone_number = values.phoneNumber;
      }
      const response = await httpClient.post('/users/user-information',dataUser)
      
      if(response.data.status == 200){
        const token = await getToken();
        const dataDecode = jwtDecode(token)
        const refreshToken = await httpClient.post('/auth/refresh-token',{user_id:dataDecode.user_id});
   
        
        await saveToken(refreshToken.data.token);
        navigator.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: screenName.accounts.accounts }],
          })
        )

      }
    },
  });

  return (
    <View style={styles.content}>
      <Input
        placeholder="Primer nombre*"
        style={styles.input}
        onChangeText={(text) => formik.setFieldValue("firstName", text)}
        errorMessage={formik.errors.firstName}
      />

      <Input
        placeholder="Segundo nombre"
        style={styles.input}
        onChangeText={(text) => formik.setFieldValue("secondName", text)}
        errorMessage={formik.errors.secondName}
      />
      <Input
        placeholder="Tercer nombre"
        style={styles.input}
        onChangeText={(text) => formik.setFieldValue("thirdName", text)}
        errorMessage={formik.errors.thirdName}
      />
      <Input
        placeholder="Primer apellido*"
        style={styles.input}
        onChangeText={(text) => formik.setFieldValue("firstLastName", text)}
        errorMessage={formik.errors.firstLastName}
      />
      <Input
        placeholder="Segundo apellido"
        style={styles.input}
        onChangeText={(text) => formik.setFieldValue("secondLastName", text)}
        errorMessage={formik.errors.secondLastName}
      />
      <Input
        placeholder="Apellido de casada"
        style={styles.input}
        onChangeText={(text) => formik.setFieldValue("marriedName", text)}
        errorMessage={formik.errors.marriedName}
      />
      <Input
        placeholder="Número de telefono*"
        style={styles.input}
        onChangeText={(text) => formik.setFieldValue("phoneNumber", text)}
        errorMessage={formik.errors.phoneNumber}
      />

      <Button
        title={"Guardar perfil"}
        containerStyle={styles.button}
        buttonStyle={styles.btn}
        onPress={formik.handleSubmit}
      />
    </View>
  );
}
