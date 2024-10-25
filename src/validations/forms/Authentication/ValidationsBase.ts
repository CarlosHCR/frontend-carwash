import * as Yup from "yup";

export const emailSchema = Yup.string()
  .matches(
    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
    "Este não é um email válido."
  )
  .required("Este campo é obrigatório!")
  .trim();

export const passwordSchema = Yup.string()
  .min(8, "A senha deve ter pelo menos 8 caracteres.")
  .matches(/[a-z]/, "A senha deve conter pelo menos uma letra minúscula.")
  .matches(/[A-Z]/, "A senha deve conter pelo menos uma letra maiúscula.")
  .matches(/\d/, "A senha deve conter pelo menos um número.")
  .matches(
    /[!@#$%^&*()\-_=+{};:,<.>]/,
    "A senha deve conter pelo menos um caractere especial (@$!%*#?&.)."
  )
  .required("Este campo é obrigatório!");

export const usernameSchema = Yup.string()
  .min(3, "O nome de usuário deve ter pelo menos 3 caracteres.")
  .max(20, "O nome de usuário não deve exceder 20 caracteres.")
  .trim()
  .required("Este campo é obrigatório!");
