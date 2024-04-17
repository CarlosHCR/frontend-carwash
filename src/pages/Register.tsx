import React from "react";
import {
  Paper,
  Typography,
  Button,
  CircularProgress,
  Grid,
  Box,
  Link,
} from "@mui/material";

import { Formik, Form } from "formik";
import TextInputField from "components/Authentication/TextInputField";
import PasswordInputField from "components/Authentication/PasswordInputField";
import Logo from "assets/logo.jpg";
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
        <Grid
          item
          xs={12}
          md={6}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src={Logo}
            alt="Logo"
            style={{
              maxWidth: "100%",
              height: "auto",
              objectFit: "contain",
              display: "block",
              maxHeight: "100vh",
            }}
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          bgcolor={"#333"}
        >
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            height="100%"
            width="100%"
          >
            <Paper
              elevation={3}
              style={{
                padding: 20,
                textAlign: "center",
                maxWidth: "80%",
                minWidth: "80%",
              }}
            >
              <Typography variant="h4">Cadastro</Typography>
              <Typography variant="body2" style={{ marginBottom: 20 }}>
                Realize cadastro para acessar o sistema
              </Typography>
              <Formik
                initialValues={initialValues}
                validationSchema={validationRegisterSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={6}>
                        <TextInputField
                          name="firstName"
                          label="Primeiro Nome"
                          type="text"
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextInputField
                          name="lastName"
                          label="Último nome"
                          type="text"
                        />
                      </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={6}>
                        <TextInputField
                          name="username"
                          label="Nome de usuário"
                          type="text"
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <PhoneInputField
                          name="phoneNumber"
                          label="Número de celular"
                        />
                      </Grid>
                    </Grid>
                    <TextInputField name="email" label="Email" type="email" />
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={6}>
                        <PasswordInputField
                          name="password1"
                          label="Senha"
                          type="password"
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <PasswordInputField
                          name="password2"
                          label="Confirme a senha"
                          type="password"
                        />
                      </Grid>
                    </Grid>
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
            </Paper>
          </Box>
        </Grid>
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
