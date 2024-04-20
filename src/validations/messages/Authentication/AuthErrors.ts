import {
  EMAIL_NOT_VERIFIED,
  INVALID_CREDENTIALS,
  EMAIL_REGISTERED,
  USERNAME_REGISTERED,
  EMAIL_USERNAME_REGISTERED,
  INVALID_RESET_PASSWORD_CONFIRM,
} from "./AuthErrorMessages";
import { ERROR_UNKNOWN, SERVER_ERROR } from "../ConstantsErrorMessage";
import { isNetworkError } from "../networkErrors";

export const getLoginResponse = (error: any): string => {
  if (isNetworkError(error)) return SERVER_ERROR;
  const isValidationError = error.response?.data?.non_field_errors;
  if (isValidationError) {
    const errorMessage = error.response.data.non_field_errors[0];
    if (errorMessage.includes("E-mail is not verified"))
      return EMAIL_NOT_VERIFIED;
  }
  return INVALID_CREDENTIALS;
};

export const getRegisterResponse = (error: any): string => {
  if (isNetworkError(error)) return SERVER_ERROR;

  const emailErrors = error.response?.data?.email;
  const usernameErrors = error.response?.data?.username;

  const emailAlreadyRegistered = emailErrors?.includes(
    "A user is already registered with this e-mail address."
  );

  const usernameAlreadyRegistered = usernameErrors?.includes(
    "A user with that username already exists."
  );

  if (emailAlreadyRegistered && usernameAlreadyRegistered)
    return EMAIL_USERNAME_REGISTERED;
  if (emailAlreadyRegistered) return EMAIL_REGISTERED;
  if (usernameAlreadyRegistered) return USERNAME_REGISTERED;

  return INVALID_CREDENTIALS;
};

export const getResetPasswordConfirmResponse = (error: any): string => {
  if (isNetworkError(error)) return SERVER_ERROR;
  else return INVALID_RESET_PASSWORD_CONFIRM;
};

export const getResetPasswordResponse = (error: any): string => {
  if (isNetworkError(error)) return SERVER_ERROR;
  return ERROR_UNKNOWN;
};

export const getEmailConfirmationResponse = (error: any): string => {
  if (isNetworkError(error)) return SERVER_ERROR;
  return ERROR_UNKNOWN;
};

export const getConfirmeResetPasswordResponse = (error: any): string => {
  if (isNetworkError(error)) return SERVER_ERROR;
  return "Erro ao confirmar a redefinição de senha. Tente reenviar o email novamente.";
};

export const getResendEmailResponse = (error: any): string => {
  if (isNetworkError(error)) return SERVER_ERROR;
  return ERROR_UNKNOWN;
};
