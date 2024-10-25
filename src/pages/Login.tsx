import React, { useState } from "react";
import {
  Typography,
  Button,
  CircularProgress,
  Grid,
  Link,
} from "@mui/material";
import { Formik, Form } from "formik";
import InputField from "components/Authentication/TextInputField";
import PasswordInputField from "components/Authentication/PasswordInputField";
import { validationLoginSchema } from "validations/forms/Authentication";
import { login } from "auth/authService";
import { ErrorModal } from "components/Dialog/";
import { useNavigate } from "react-router-dom";
import ResetPasswordModal from "components/Authentication/Dialog/ResetPassword";
import { REGISTER_ROUTE } from "routes/ConstantsURLRoutes";
import { getLoginResponse } from "validations/messages/Authentication";
import ContainerPaper from "components/Authentication/ContainerPaper";
import ResendEmailModal from "components/Authentication/Dialog/ResendEmail";
import { RoleRoute } from "hooks/RoleRoute";

interface LoginIUser {
  username: string;
  password: string;
}

const initialValues: LoginIUser = {
  username: "",
  password: "",
};

const Login: React.FC = () => {
  const [error, setError] = React.useState<string | null>(null);
  const navigate = useNavigate();
  const [isResetPasswordModalOpen, setIsResetPasswordModalOpen] =
    useState(false);
  const [isResendEmailModalOpen, setIsResendEmailModalOpen] = useState(false);

  const openResetPasswordModal = () => {
    setIsResetPasswordModalOpen(true);
  };

  const closeResetPasswordModal = () => {
    setIsResetPasswordModalOpen(false);
  };

  const openResendEmailModal = () => {
    setIsResendEmailModalOpen(true);
  };

  const closeResendEmailModal = () => {
    setIsResendEmailModalOpen(false);
  };

  const handleSubmit = async (
    values: LoginIUser,
    actions: { resetForm: () => void; setSubmitting: (arg0: boolean) => void }
  ) => {
    try {
      await login(values.username, values.password);
      actions.resetForm();
      navigate(RoleRoute());
    } catch (error) {
      const errorResponse = getLoginResponse(error);
      setError(errorResponse);
    } finally {
    }
  };

  return (
    <>
      <ContainerPaper>
        <Typography variant="h4">Acessar</Typography>
        <Typography variant="body2" style={{ marginBottom: 20 }}>
          Realize login para acessar o sistema
        </Typography>
        <Grid item></Grid>
        <Formik
          initialValues={initialValues}
          validationSchema={validationLoginSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <InputField name="username" label="Nome de usuário" type="text" />
              <PasswordInputField
                name="password"
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
                {isSubmitting ? "Acessando..." : "Acessar"}
              </Button>
            </Form>
          )}
        </Formik>
        <Grid
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          flexDirection={"column"}
        >
          <Grid item xs={12} md={6}>
            <Link href={REGISTER_ROUTE} underline="hover" variant="subtitle2">
              Ainda não tem uma conta?
            </Link>
          </Grid>
          <Grid item xs={12} md={6}>
            <Link
              onClick={openResetPasswordModal}
              underline="hover"
              variant="subtitle2"
            >
              Esqueceu sua senha?
            </Link>
          </Grid>
          <Grid item xs={12} md={6}>
            <Link
              onClick={openResendEmailModal}
              underline="hover"
              variant="subtitle2"
            >
              Verificar e-mail
            </Link>
          </Grid>
        </Grid>
      </ContainerPaper>
      {isResetPasswordModalOpen && (
        <ResetPasswordModal onClose={closeResetPasswordModal} />
      )}
      {isResendEmailModalOpen && (
        <ResendEmailModal onClose={closeResendEmailModal} />
      )}
      {error && (
        <ErrorModal errorMessage={error} onClose={() => setError(null)} />
      )}
    </>
  );
};

export default Login;
