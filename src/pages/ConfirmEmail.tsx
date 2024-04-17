import React, { useEffect, useState } from "react";
import { Button, CircularProgress, Link, Typography } from "@mui/material";
import { Formik, Form } from "formik";
import { confirmEmail, resendEmail } from "auth/authService";
import { getURLParams } from "utils/Formats";
import { validationResendEmailSchema } from "validations/forms/Authentication";
import TextInputField from "components/Authentication/TextInputField";
import { ErrorModal, SuccessModal } from "components/Dialog";
import { useNavigate } from "react-router-dom";
import { LOGIN_ROUTE } from "routes/ConstantsURLRoutes";
import { EMAIL_SUCCESSFULLY_SENT } from "validations/messages/Authentication";
import { getEmailConfirmationResponse } from "validations/messages/Authentication/AuthErrors";
import ContainerPaper from "components/Authentication/ContainerPaper";

const ConfirmEmailValues: ConfirmEmailProps = {
  email: "",
};

interface ConfirmEmailProps {
  email: string;
}

const ConfirmEmail: React.FC = () => {
  const [error, setError] = useState<boolean | null>(null);
  const [success, setSuccess] = React.useState<string | null>(null);
  const [errorDialog, setErrorDialog] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleConfirmEmail = async () => {
      const { TOKEN } = getURLParams(window.location.href);
      try {
        await confirmEmail(TOKEN);
      } catch (error) {
        setError(true);
      }
    };

    handleConfirmEmail();
  }, []);

  const handleSubmit = async (
    values: ConfirmEmailProps,
    actions: {
      resetForm: () => void;
    }
  ) => {
    try {
      console.log(values);
      await resendEmail(values.email);
      actions.resetForm();
      setSuccess(EMAIL_SUCCESSFULLY_SENT);
    } catch (error) {
      const errorMessage = getEmailConfirmationResponse(error);
      setErrorDialog(errorMessage);
    } finally {
    }
  };

  return (
    <>
      <ContainerPaper>
        {error ? (
          <Formik
            initialValues={ConfirmEmailValues}
            validationSchema={validationResendEmailSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <Typography variant="body1">
                  Ocorreu um erro ao verificar seu e-mail. Gostaria de tentar
                  enviar novamente?
                </Typography>

                <TextInputField name="email" label="E-mail" type="email" />

                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                  startIcon={isSubmitting && <CircularProgress size={20} />}
                  style={{ marginTop: 20 }}
                >
                  {isSubmitting ? "Enviando..." : "Enviar novamente"}
                </Button>
              </Form>
            )}
          </Formik>
        ) : (
          <>
            <Typography variant="h6">Sucesso ao verificar email</Typography>
            <Link href={LOGIN_ROUTE} underline="hover" variant="subtitle2">
              Deseja fazer login?
            </Link>
          </>
        )}
      </ContainerPaper>
      {success && (
        <SuccessModal message={success} onClose={() => navigate(LOGIN_ROUTE)} />
      )}
      {errorDialog && (
        <ErrorModal
          errorMessage={errorDialog}
          onClose={() => setErrorDialog(null)}
        />
      )}
    </>
  );
};

export default ConfirmEmail;
