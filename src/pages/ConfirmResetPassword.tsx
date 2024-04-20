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

const ConfirmResetPasswordValues: ConfirmResetPasswordProps = {
  newPassword: "",
  newPassword2: "",
};

interface ConfirmResetPasswordProps {
  newPassword: string;
  newPassword2: string;
}

const ConfirmResetPassword: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = React.useState<string | null>(null);
  const navigate = useNavigate();
  const [isResetPasswordModalOpen, setIsResetPasswordModalOpen] =
    useState(false);

  const openResetPasswordModal = () => {
    setIsResetPasswordModalOpen(true);
  };

  const closeResetPasswordModal = () => {
    setIsResetPasswordModalOpen(false);
  };

  const handleSubmit = async (
    values: ConfirmResetPasswordProps,
    actions: { resetForm: () => void; setSubmitting: (arg0: boolean) => void }
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
      const errorResponse = getConfirmeResetPasswordResponse(error);
      setError(errorResponse);
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <>
      <ContainerPaper>
        <Typography variant="h4">Redefinir senha</Typography>
        <Typography variant="body2" style={{ marginBottom: 20 }}>
          Para redefinir a senha, preencha os campos abaixo.
        </Typography>
        <Formik
          initialValues={ConfirmResetPasswordValues}
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
                label="Senha"
                type="password"
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isSubmitting}
                startIcon={isSubmitting && <CircularProgress size={20} />}
                style={{ marginTop: 20 }}
              >
                {isSubmitting ? "Enviando..." : "Enviar"}
              </Button>
            </Form>
          )}
        </Formik>
        <Link
          onClick={openResetPasswordModal}
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
        <ResetPasswordModal onClose={closeResetPasswordModal} />
      )}
    </>
  );
};

export default ConfirmResetPassword;
