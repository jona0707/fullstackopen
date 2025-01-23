import * as yup from "yup";

const isRequired = "Este campo es requerido.";
const isNotValid = "no válido.";
const nombreRegex = /^[a-zA-ZÀ-ÿ\s]{1,40}$/;
const correoRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

export const validationSchema = yup.object({
  nombre: yup
    .string()
    .matches(nombreRegex, "El nombre solo puede contener letras y espacios.")
    .required(isRequired),
  correo: yup
    .string()
    .matches(correoRegex, 'El correo solo puede contener letras, números, ".", "+", "-", "@" y debe finalizar en ".com".')
    .email(`Correo ${isNotValid}`)
    .required(isRequired),
});
