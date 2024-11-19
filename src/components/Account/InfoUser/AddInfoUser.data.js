import * as Yup from "yup";

export function inicialValues() {
  return {
    firstName: "",
    secondName: "",
    thirdName: "",
    firstLastName: "",
    secondLastName: "",
    marriedName: "",
    phoneNumber: "",
  };
}
export function validationSchema() {
  return Yup.object({
    firstName: Yup.string()
      .required("El nombre es obligatorio")
      .typeError("Solo pueden ser caracteres"),

    secondName: Yup.string()
      .typeError("Solo pueden ser caracteres")
      .notRequired(),

    thirdName: Yup.string()
      .typeError("Solo pueden ser caracteres")
      .notRequired(),

    firstLastName: Yup.string()
      .required("El primer apellido es obligatorio")
      .typeError("Solo pueden ser caracteres"),

    secondLastName: Yup.string()
      .typeError("Solo pueden ser caracteres")
      .notRequired(),

    marriedName: Yup.string()
      .typeError("Solo pueden ser caracteres")
      .notRequired(),

    phoneNumber: Yup.string()
      .matches(/^[0-9]+$/, "Solo se admiten números")
      .required("El número de teléfono es obligatorio"),
  });
}
