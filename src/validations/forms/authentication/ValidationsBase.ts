import * as Yup from "yup";

export const emailSchema = Yup.string()
  .matches(
    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
    "Este não é um email válido."
  )
  .required("Este campo é obrigatório!")
  .trim();

const passwordRegex =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&.\\])[A-Za-z\d@$!%*#?&.\\]{8,}$/;

export const passwordSchema = Yup.string()
  .test(
    "password",
    "A senha deve ter pelo menos 8 caracteres, incluir pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial (@$!%*#?&.).",
    (value: any) => passwordRegex.test(value)
  )
  .required("Este campo é obrigatório!");

export const usernameSchema = Yup.string()
  .min(3, "O nome de usuário deve ter pelo menos 3 caracteres.")
  .max(20, "O nome de usuário não deve exceder 20 caracteres.")
  .trim()
  .required("Este campo é obrigatório!");
