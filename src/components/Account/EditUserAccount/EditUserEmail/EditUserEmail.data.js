import * as Yup from "yup";

export function initialValues() {
    return {
        email: "",
        password: "",
        confirmPassword: "",
    };
}

export function schemaValidation() {
    return Yup.object({
        email: Yup.string()
           .email("El email no es válido")
           .required("El email es obligatorio"),
        password: Yup.string()
           .min(8, "La contraseña debe tener al menos 8 caracteres"),
        confirmPassword: Yup.string()
           .oneOf([Yup.ref("password"), null], "Las contraseñas no coinciden"),
    });
}