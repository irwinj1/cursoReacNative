import * as Yup from "yup";

export function initialValues() {
    return {
      first_name:'',
      second_name:'',
      third_name:'',
      first_last_name:'',
      second_last_name:'',
      married_name:'',
      phone_number:'',
    };
}

export function schemaValidation() {
    return Yup.object({
        first_name: Yup.string()
           .required("Primer nombre es obligatorio"),
        second_name: Yup.string(),
        third_name: Yup.string(),
        first_last_name: Yup.string()
           .required("Primer apellido es obligatorio"),
        second_last_name: Yup.string(),
        married_name: Yup.string(),
        phone_number: Yup.string()
           .required("Número de teléfono es obligatorio")
           .matches(/^\+?[1-9]\d{1,14}$/, "Número de teléfono no válido"),
    });
}