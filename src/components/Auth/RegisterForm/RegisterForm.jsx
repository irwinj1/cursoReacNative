import React, { useState } from "react";
import { View } from "react-native";
import { Input, Icon, Button } from "@rneui/base";
import { styles } from "./RegisterFormStyle";
import { ErrorMessage, useFormik } from "formik";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { CommonActions, useNavigation } from "@react-navigation/native";
import {httpClient, saveToken, screenName} from '../../../utils'
import { initialValue,SchemaValidation } from "./RegiterForma.data";
import Toast from "react-native-toast-message";



export function RegisterForm() {
  const [iconUse, setIconUse] = useState("eye-outline");
  const [iconUseRepeat, setIconUseRepeat] = useState("eye-outline");
  const [securityText, setSecurityText] = useState(true);
  const [securityTextRepeat, setSecurityTextRepeat] = useState(true);
  const navigator = useNavigation();
  const formik = useFormik({
    initialValues: initialValue(),
    validationSchema: SchemaValidation(),
    validationOnchange: false,
    onSubmit: async (values) => {
      try {
        // const auth = getAuth();
        // await createUserWithEmailAndPassword(auth,values.email, values.password);
        const response = await httpClient.post('/auth/register',{
          email: values.email,
          password: values.password,
          repeat_password: values.repeatPassword,
        })
        

        if (response?.data?.status == 200) {
          Toast.show({
            text1: "Éxito",
            text2: "Has creado una cuenta correctamente",
            type: "success",
            position: "bottom",
          });
          
          await saveToken(response?.data?.data?.original?.token)
          navigator.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: screenName.accounts.accounts }],
            })
          )
        } else {
          Toast.show({
            text1: "Error",
            text2: response.data.message,
            type: "error",
            position: "bottom",
          });
        }
        
      } catch (error) {
        Toast.show({
          text1: "Error al crear cuenta",
          text2: error.message,
          type: "error",
          position: "bottom",
        });
        
      }
    },
  });
  const changeIconPass = () => {
    if (iconUse === "eye-outline") {
      setIconUse("eye-off-outline");
      setSecurityText(false);
      setSecurityTextRepeat(false);
    } else {
      setIconUse("eye-outline");
      setSecurityText(true);
      setSecurityTextRepeat(true);
    }
  };
  const changeIconPassRepeat = () => {
    if (iconUseRepeat === "eye-outline") {
        setIconUseRepeat("eye-off-outline");
      setSecurityTextRepeat(false);
    } else {
        setIconUseRepeat("eye-outline");
      setSecurityTextRepeat(true);
    }
  };
  return (
    <View style={styles.content}>
      <Input
        placeholder="Correo eléctronico"
        containerStyle={styles.input}
        rightIcon={
          <Icon
            type="material-community"
            name="at"
            size={20}
            color="black"
            iconStyle={styles.icon}
          />
        }
        onChangeText={(text) => formik.setFieldValue("email", text)}
       // onBlur={() => formik.setFieldTouched("email")}
        errorMessage={formik.touched.email && formik.errors.email ? formik.errors.email : ""}
      />
      <Input
        placeholder="Contraseña"
        containerStyle={styles.input}
        secureTextEntry={securityText}
        rightIcon={
          <Icon
            onPress={changeIconPass}
            type="material-community"
            name={iconUse}
            size={20}
            color="black"
            iconStyle={styles.icon}
          />
        }
        onChangeText={(text) => formik.setFieldValue("password", text)}
       // onBlur={() => formik.setFieldTouched("password")}
        errorMessage={formik.touched.password && formik.errors.password ? formik.errors.password : ""}
      />
      <Input
        placeholder="Repita contraseña"
        containerStyle={styles.input}
        secureTextEntry={securityTextRepeat}
        rightIcon={
          <Icon
            onPress={changeIconPassRepeat}
            type="material-community"
            name={iconUseRepeat}
            size={20}
            color="black"
            iconStyle={styles.icon}
          />
        }
        onChangeText={(text) => formik.setFieldValue("repeatPassword", text)}
       // onBlur={() => formik.setFieldTouched("repeatPassword")}
        errorMessage={
          formik.touched.repeatPassword && formik.errors.repeatPassword ? formik.errors.repeatPassword : ""
        }
      />

      <Button
        title="Registrarse"
        containerStyle={styles.button}
        buttonStyle={styles.btn}
        onPress={formik.handleSubmit}
        loading={formik.isSubmitting}
      />
    </View>
  );
}
