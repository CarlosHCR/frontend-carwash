import React from "react";
import { Button, CircularProgress, Grid, Link } from "@mui/material";
import { Formik, Form } from "formik";
import TextInputField from "components/Authentication/TextInputField";
import PasswordInputField from "components/Authentication/PasswordInputField";
import { validationRegisterSchema } from "validations/forms/Authentication";
import { register } from "auth/authService";
import { ErrorModal } from "components/Dialog/";
import { SuccessModal } from "components/Dialog/";
import { PhoneInputField } from "components/Authentication/PhoneInputField";
import { LOGIN_ROUTE } from "routes/ConstantsURLRoutes";
import {
  REGISTER_SUCCESS,
  getRegisterResponse,
} from "validations/messages/Authentication";
import ContainerRegisterImage from "components/Authentication/RegisterPage/ContainerRegisterImage";
import ContainerRegisterForm from "components/Authentication/RegisterPage/ContainerRegisterForm";
import ContainerFields from "components/Authentication/RegisterPage/ContainerFields";

interface RegisterIUser {
  username: string;
  email: string;
  password1: string;
  password2: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
}

const initialValues: RegisterIUser = {
  username: "",
  email: "",
  password1: "",
  password2: "",
  firstName: "",
  lastName: "",
  phoneNumber: "",
};

const Register: React.FC = () => {
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState<string | null>(null);

  const handleSubmit = async (
    values: RegisterIUser,
    actions: { resetForm: () => void; setSubmitting: (arg0: boolean) => void }
  ) => {
    try {
      await register(
        values.username,
        values.email,
        values.password1,
        values.password2,
        values.firstName,
        values.lastName,
        values.phoneNumber
      );
      actions.resetForm();
      setSuccess(REGISTER_SUCCESS);
    } catch (error) {
      const errorResponse = getRegisterResponse(error);
      setError(errorResponse);
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <>
      <Grid container style={{ height: "100vh" }}>
        <ContainerRegisterImage />
        <ContainerRegisterForm>
          <Formik
            initialValues={initialValues}
            validationSchema={validationRegisterSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <ContainerFields
                  leftChild={
                    <TextInputField
                      name="firstName"
                      label="Primeiro Nome"
                      type="text"
                    />
                  }
                  rightChild={
                    <TextInputField
                      name="lastName"
                      label="Último Nome"
                      type="text"
                    />
                  }
                />
                <ContainerFields
                  leftChild={
                    <TextInputField
                      name="username"
                      label="Nome de usuário"
                      type="text"
                    />
                  }
                  rightChild={
                    <PhoneInputField
                      name="phoneNumber"
                      label="Número de celular"
                    />
                  }
                />
                <TextInputField name="email" label="Email" type="email" />
                <ContainerFields
                  leftChild={
                    <PasswordInputField
                      name="password1"
                      label="Senha"
                      type="password"
                    />
                  }
                  rightChild={
                    <PasswordInputField
                      name="password2"
                      label="Confirme a senha"
                      type="password"
                    />
                  }
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                  startIcon={isSubmitting && <CircularProgress size={20} />}
                  style={{ marginTop: 20 }}
                >
                  {isSubmitting ? "Cadastrando..." : "Cadastrar"}
                </Button>
              </Form>
            )}
          </Formik>
          <Link href={LOGIN_ROUTE} underline="hover" variant="subtitle2">
            Já possui uma conta?
          </Link>
        </ContainerRegisterForm>
      </Grid>
      {success && (
        <SuccessModal message={success} onClose={() => setSuccess(null)} />
      )}
      {error && (
        <ErrorModal errorMessage={error} onClose={() => setError(null)} />
      )}
    </>
  );
};

export default Register;
