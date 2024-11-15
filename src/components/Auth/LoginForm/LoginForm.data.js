import * as Yup from "yup";
export function initialValue() {
    return {
        email: '',
        password: '',
    }
}

export function SchemaValidation() {
    return Yup.object({
        email: Yup.string()
            .email('El email no es correcto')
            .required('El email es obligatorio'),
        password: Yup.string()
            .min(8, 'La contraseña debe tener al menos 8 caracteres')
            .required('La contraseña es obligatoria'),
    });
}