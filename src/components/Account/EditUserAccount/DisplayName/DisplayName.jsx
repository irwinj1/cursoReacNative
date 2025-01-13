import { View, Text, ScrollView } from "react-native";
import React from "react";
import { Button, Input } from "@rneui/base";
import { useFormik } from "formik";
import { initialValues, schemaValidation } from "./DisplayName.data";
import { styles } from "./DisplayNameStyle";
import { updatePersonalInformation } from "../../../../services/user.services";
import {isTokenExpire,refreshToken,saveToken} from "../../../../utils"
export function DisplayName({getInfoUserData}) {
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: schemaValidation,
    validateOnChange: false,
    onSubmit: async (values) => {
      const isInvalidtoken = isTokenExpire;
      if(isInvalidtoken){
        const refreshTokens= await refreshToken()
        await saveToken(refreshTokens)
      }
      console.log(values);
      
      // const response = await updatePersonalInformation(values);
      
      // if (response.status == 200) {
      //   getInfoUserData()
      // } else {
      //   console.log("Error al actualizar los datos personales");
      // }
      
    },
    // Other options...
  });

  return (
    <View>
      <Text style={styles.title}>Cambiar nombre y apellidos</Text>

      <ScrollView centerContent={true} style={{ minHeight: "50%" }}>
        <Input
          placeholder="Primer nombre"
          onChangeText={(text) => formik.setFieldValue("first_name", text)}
          errorMessage={formik.errors.first_name}
        />
        <Input
          placeholder="Segundo nombre"
          onChangeText={(text) => formik.setFieldValue("second_name", text)}
          errorMessage={formik.errors.second_name}
        />
        <Input
          placeholder="Tercer nombre"
          onChangeText={(text) => formik.setFieldValue("third_name", text)}
          errorMessage={formik.errors.third_name}
        />
        <Input
          placeholder="Primer apellido"
          onChangeText={(text) => formik.setFieldValue("first_last_name", text)}
          errorMessage={formik.errors.first_last_name}
        />
        <Input
          placeholder="Segundo apellido"
          onChangeText={(text) =>
            formik.setFieldValue("second_last_name", text)
          }
          errorMessage={formik.errors.second_last_name}
        />
        <Input
          placeholder="Apellido de casada"
          onChangeText={(text) => formik.setFieldValue("married_name", text)}
          errorMessage={formik.errors.married_name}
        />
        <Input
          placeholder="Telefono"
          onChangeText={(text) => formik.setFieldValue("phone_number", text)}
          errorMessage={formik.errors.phone_number}
        />
        <Button
          titleStyle={styles.btnTitle}
          containerStyle={styles.btnContainer}
          buttonStyle={styles.btnstyle}
          title="Actualizar"
          onPress={formik.handleSubmit}
          loading={formik.isSubmitting}
        />
      </ScrollView>
    </View>
  );
}
