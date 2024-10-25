import * as Yup from "yup";
import { emailSchema } from "./ValidationsBase";

export const validationResendEmailSchema = Yup.object().shape({
  email: emailSchema,
});
