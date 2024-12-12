import { View, Text } from "react-native";
import React, { useState } from "react";
import { Button, Input, Dialog, Icon } from "@rneui/themed";
import { styles } from "./EditUserEmailStyle";
import { useFormik } from "formik";
import { initialValues, schemaValidation } from "./EditUserEmail.data";

export function EditUserEmail({ userInfo, setEmailUserDialog }) {
  const[showPassword,setShowPassword] = useState(false);
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: schemaValidation,
    validateOnChange: false,
  
    onSubmit: () => {},
  });
  const handleEmailChange = async () => {
    // update email
    setEmailUserDialog(false);
  };
  const handleChangePassword = ()=>{
    console.log('aqui');
    
    setShowPassword(!showPassword);
  }
  return (
    <View>
      <Dialog.Title title="Actualizar email" />
      <View>
        <Input
          onChangeText={(text) => formik.setFieldValue("email", text)}
          label="Email"
          labelStyle={styles.label}
          value={formik.values.email}
          errorMessage={formik.errors.email}
        />
        <Input
          onChangeText={(text) => formik.setFieldValue("email", text)}
          secureTextEntry={showPassword}
          label="Contraseña"
          labelStyle={styles.label}
          value={formik.values.password}
          errorMessage={formik.errors.password}
          rightIcon={
            <Icon
            
              type="material-community"
              name="eye-outline"
              size={20}
              iconStyle={styles.icon}
              onPress={()=>handleChangePassword()}
            />
          }
        />
      </View>
      <Dialog.Actions>
        {/* <Button onPress={handleEmailChange} buttonStyle={styles.btnstyle} titleStyle={{ color: '#00a680', marginHorizontal: 20 }} containerStyle={styles.btnContainer} title='Actualizar' type='outline' /> */}
        <Button
          onPress={() => setEmailUserDialog(false)}
          title="Cerrar"
          type="outline"
          titleStyle={{ color: "#ff3409", marginHorizontal: 20 }}
          buttonStyle={{
            borderColor: "#ff3409",
            paddingVertical: 10,
            justifyContent: "center",
            alignItems: "center",
          }}
          containerStyle={styles.btnContainer}
        />
        <Button
          onPress={handleEmailChange}
          title="Actualizar"
          type="outline"
          titleStyle={{ color: "#00a680", marginHorizontal: 20 }}
          buttonStyle={styles.btnstyle}
          containerStyle={styles.btnContainer}
        />
        {/* <Dialog.Button title="Cancelar" onPress={() => setNameUserDialog(false)} />
          <Dialog.Button title="Actualizar" onPress={() => setNameUserDialog(false)} /> */}
      </Dialog.Actions>
    </View>
  );
}
