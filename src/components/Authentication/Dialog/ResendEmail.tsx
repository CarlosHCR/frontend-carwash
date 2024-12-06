import React from "react";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Formik, Form } from "formik";
import InputField from "../TextInputField";
import { resetPasswordSchema } from "validations/forms/Authentication/ResetPasswordForm";
import { resendEmail } from "auth/authService";
import { ErrorModal, SuccessModal } from "components/Dialog";
import { getResendEmailResponse } from "validations/messages/Authentication/AuthErrors";
import { EMAIL_VERIFICATION_SUCCESS } from "validations/messages/Authentication/AuthSuccess";

interface ResendEmailModalProps {
  onClose: () => void;
}

const ResendEmailModal: React.FC<ResendEmailModalProps> = ({ onClose }) => {
  const [success, setSuccess] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  const handleClose = () => {
    onClose();
  };

  const handleSubmit = async (
    values: any,
    actions: { resetForm: () => void; setSubmitting: (arg0: boolean) => void }
  ) => {
    try {
      await resendEmail(values.email);
      setSuccess(EMAIL_VERIFICATION_SUCCESS);
      actions.resetForm();
    } catch (error) {
      const errorResponse = getResendEmailResponse(error);
      setError(errorResponse);
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <Dialog fullWidth maxWidth="sm" open onClose={onClose}>
      <DialogTitle display={"flex"} justifyContent={"center"}>
        <Grid container alignItems="center" justifyContent="center">
          <Grid item>
            <Typography variant="h4" fontStyle={"bold"} padding={2}>
              Reenviar Email
            </Typography>
          </Grid>
          <Grid item style={{ position: "absolute", right: 8, top: 8 }}>
            <IconButton
              aria-label="close"
              onClick={onClose}
              style={{ color: "red" }}
            >
              <CloseIcon />
            </IconButton>
          </Grid>
        </Grid>
      </DialogTitle>
      <DialogContent>
        <Formik
          initialValues={{ email: "" }}
          validationSchema={resetPasswordSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <InputField name="email" label="Email" type="email" />
              <DialogActions
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: 2,
                }}
              >
                <Button
                  type="submit"
                  variant="contained"
                  disabled={isSubmitting}
                  startIcon={isSubmitting && <CircularProgress size={20} />}
                >
                  {isSubmitting ? "Enviando..." : "Confirmar"}
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </DialogContent>
      {success && (
        <SuccessModal
          message={success}
          onClose={() => {
            setSuccess(null);
            handleClose();
          }}
        />
      )}
      {error && (
        <ErrorModal
          errorMessage={error}
          onClose={() => {
            setError(null);
            handleClose();
          }}
        />
      )}
    </Dialog>
  );
};

export default ResendEmailModal;
