import * as Yup from "yup";
import { passwordSchema } from "./ValidationsBase";

export const ValidationConfirmResetPasswordSchema = Yup.object().shape({
  newPassword: passwordSchema,
  newPassword2: Yup.string()
    .oneOf([Yup.ref("newPassword"), ""], "As senhas devem ser iguais.")
    .required("Este campo é obrigatório!"),
});
