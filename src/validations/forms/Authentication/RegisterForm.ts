import * as Yup from "yup";
import { emailSchema, usernameSchema, passwordSchema } from "./ValidationsBase";

const phoneNumberRegex = /^\(?\d{2}\)?\s?(?:9\s?\d{4}|\d{4})[-\s]?\d{4}$/;

export const validationRegisterSchema = Yup.object().shape({
  username: usernameSchema,
  email: emailSchema,
  password1: passwordSchema,
  password2: Yup.string()
    .oneOf([Yup.ref("password1"), ""], "As senhas devem ser iguais.")
    .required("Este campo é obrigatório!"),
  firstName: Yup.string()
    .min(3, `O nome deve ter pelo menos 3 caracteres.`)
    .max(30, `O nome não deve exceder 30 caracteres.`)
    .trim()
    .required("Este campo é obrigatório!"),
  lastName: Yup.string()
    .min(3, `O sobrenome deve ter pelo menos 3 caracteres.`)
    .max(30, `O sobrenome não deve exceder 30 caracteres.`)
    .trim()
    .required("Este campo é obrigatório!"),
  phoneNumber: Yup.string()
    .matches(phoneNumberRegex, "O telefone deve ser válido.")
    .required("Este campo é obrigatório!"),
});
