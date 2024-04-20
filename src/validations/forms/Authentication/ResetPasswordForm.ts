import { emailSchema } from "./ValidationsBase";
import * as Yup from "yup";

export const resetPasswordSchema = Yup.object().shape({
  email: emailSchema,
});
