import { View } from "react-native";
import { Input, Button, Icon } from "@rneui/base";
import React, { useState } from "react";
import { styles } from "./LoginFormStyle";
import { useFormik } from "formik";
import { initialValue,SchemaValidation } from "./LoginForm.data";
import Toast from "react-native-toast-message";
import { getAuth,signInWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { screenName } from "../../../utils";

export function LoginForm() {
    const navigation = useNavigation();
    const [showPassword,setShowPassword] = useState(true);
    const formik = useFormik({
        initialValues: initialValue(),
        validationSchema:SchemaValidation(),
        validateOnChange:false,
        onSubmit: async (values) => {
           try {
          //  console.log(values);
            const auth = getAuth();
            await signInWithEmailAndPassword(auth, values.email,values.password);
            navigation.navigate(screenName.accounts.accounts)
            formik.resetForm();

            Toast.show({
                text1: "Éxito",
                text2: "Has iniciado sesión correctamente",
                type: "success",
                position: "top"
            })
           
           } catch (error) {
            Toast.show({
                text1: "Error",
                text2: error.message,
                type: "error",
                position: "bottom"
            });
 
           }
            // Aquí se puede hacer la petición de login a la API
        }
    })

    const showPasswordHandler = () => {
        setShowPassword(!showPassword);
    };
  return (
    <View style={styles.content}>
      <Input
        placeholder="Ingrese su email"
        style={styles.input}
        value={formik.values.email}
        rightIcon={
          <Icon
            type="material-community"
            name="at"
            size={20}
            iconStyle={styles.icon}
          />
        }
        onChangeText={(text)=> formik.setFieldValue('email', text)}
        errorMessage={formik.errors.email }
      />
      <Input
        placeholder="Ingrese su contraseña"
        secureTextEntry={showPassword}
        rightIcon={
          <Icon
            type="material-community"
            name={showPassword?"eye-outline":"eye-off-outline"}
            size={20}
            iconStyle={styles.icon}
            onPress={showPasswordHandler}
          />
        }
        value={formik.values.password}
        onChangeText={text=> formik.setFieldValue('password', text)}
        errorMessage={formik.errors.password }
      />
      <Button
        title="Iniciar Sesión"
        buttonStyle={styles.btn}
        containerStyle={styles.button}
        onPress={formik.handleSubmit}
        
      />
    </View>
  );
}
