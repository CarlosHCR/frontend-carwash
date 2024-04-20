import * as Yup from "yup";
import { usernameSchema, passwordSchema } from "./ValidationsBase";

export const validationLoginSchema = Yup.object().shape({
  username: usernameSchema,
  password: passwordSchema,
});
