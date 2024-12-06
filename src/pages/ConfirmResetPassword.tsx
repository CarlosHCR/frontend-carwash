import React, { useState } from "react";
import { Button, CircularProgress, Link, Typography } from "@mui/material";
import { Formik, Form } from "formik";
import { confirmPasswordReset } from "auth/authService";
import { getURLParams } from "utils/Formats";
import { ErrorModal, SuccessModal } from "components/Dialog";
import { useNavigate } from "react-router-dom";
import { LOGIN_ROUTE } from "routes/ConstantsURLRoutes";
import { getConfirmeResetPasswordResponse } from "validations/messages/Authentication/AuthErrors";
import ContainerPaper from "components/Authentication/ContainerPaper";
import PasswordInputField from "components/Authentication/PasswordInputField";
import ResetPasswordModal from "components/Authentication/Dialog/ResetPassword";
import { PASSWORD_SUCCESSFULLY_RESET } from "validations/messages/Authentication/AuthSuccess";
import { ValidationConfirmResetPasswordSchema } from "validations/forms/Authentication";

interface FormValues {
  newPassword: string;
  newPassword2: string;
}

const ConfirmResetPassword: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const navigate = useNavigate();
  const [isResetPasswordModalOpen, setIsResetPasswordModalOpen] =
    useState(false);

  const handleSubmit = async (
    values: FormValues,
    actions: {
      resetForm: () => void;
      setSubmitting: (isSubmitting: boolean) => void;
    }
  ) => {
    try {
      const { UID, TOKEN } = getURLParams(window.location.href);
      await confirmPasswordReset(
        UID,
        TOKEN,
        values.newPassword,
        values.newPassword2
      );
      actions.resetForm();
      setSuccess(PASSWORD_SUCCESSFULLY_RESET);
    } catch (error) {
      const errorResponse =
        getConfirmeResetPasswordResponse(error) ||
        "Erro inesperado. Tente novamente.";
      setError(errorResponse);
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <>
      <ContainerPaper>
        <Typography variant="h4">Redefinir senha</Typography>
        <Typography variant="body2" sx={{ marginBottom: 2 }}>
          Para redefinir a senha, preencha os campos abaixo.
        </Typography>
        <Formik
          initialValues={{ newPassword: "", newPassword2: "" }}
          validationSchema={ValidationConfirmResetPasswordSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <PasswordInputField
                name="newPassword"
                label="Senha"
                type="password"
              />
              <PasswordInputField
                name="newPassword2"
                label="Confirmar senha"
                type="password"
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isSubmitting}
                startIcon={isSubmitting && <CircularProgress size={20} />}
                sx={{ mt: 2 }}
              >
                Redefinir
              </Button>
            </Form>
          )}
        </Formik>
        <Link
          onClick={() => setIsResetPasswordModalOpen(true)}
          underline="hover"
          variant="subtitle2"
        >
          Reenviar email de redefinição de senha.
        </Link>
      </ContainerPaper>
      {success && (
        <SuccessModal message={success} onClose={() => navigate(LOGIN_ROUTE)} />
      )}
      {error && (
        <ErrorModal errorMessage={error} onClose={() => setError(null)} />
      )}
      {isResetPasswordModalOpen && (
        <ResetPasswordModal
          onClose={() => setIsResetPasswordModalOpen(false)}
        />
      )}
    </>
  );
};

export default ConfirmResetPassword;
