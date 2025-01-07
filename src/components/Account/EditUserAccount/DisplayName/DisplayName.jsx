import { View, Text, ScrollView } from "react-native";
import React from "react";
import { Button, Input } from "@rneui/base";
import { useFormik } from "formik";
import { initialValues, schemaValidation } from "./DisplayName.data";
import { styles } from "./DisplayNameStyle";

export function DisplayName() {
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: schemaValidation,
    validateOnChange: false,
    onSubmit: (values) => {
      console.log(values);
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
