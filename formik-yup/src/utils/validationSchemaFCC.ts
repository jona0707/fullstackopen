import * as yup from "yup";

const isRequired = "Este campo es requerido.";
const correoRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

export const validationSchemaFCC = yup.object({
  fullname: yup.string().required(isRequired),
  email: yup
    .string()
    .matches(correoRegex, "Correo inválido")
    .required(isRequired),
  password: yup
    .string()
    .min(6, "La contraseña debe tener al menos 6 caracteres")
    .required(isRequired),
});
