import React, { useEffect, useState } from "react";
import {
  Button,
  Paper,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material";
import { Formik, Form } from "formik";
import InputField from "components/CarWash/Fields/InputField";
import SelectField from "components/CarWash/Fields/SelectField";
import CustomTextarea from "components/CarWash/Fields/CustomTextarea";
import { CarwashServiceRegistryFormValidationSchema } from "validations/forms/CarWash";
import {
  getAllServiceTypes,
  setCarwashServices,
} from "services/carwashService.service";
import { ErrorModal, SuccessModal } from "components/Dialog/";
import { useNavigate } from "react-router-dom";
import { LOGIN_ROUTE } from "routes/ConstantsURLRoutes";
import {
  SERVICE_SUCCESSFULLY_CREATE,
  getFormErrorResponse,
} from "validations/messages/CarWash";
import { formatDateAndTimeISO } from "utils";

interface CarwashServiceRegistryForm {
  vehicleLicensePlate: string;
  serviceType: string;
  price: number;
  serviceDate: string;
  hour: string;
  notes: string;
}

const initialValues: CarwashServiceRegistryForm = {
  vehicleLicensePlate: "",
  serviceType: "",
  price: 0,
  serviceDate: "",
  hour: "",
  notes: "",
};

const CarwashServiceRegistry: React.FC = () => {
  const navigate = useNavigate();
  const [serviceTypeOptions, setServiceTypeOptions] = useState<any[]>([]);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = React.useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getAllServiceTypes();
        setServiceTypeOptions(result);
      } catch (error: any) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (
    values: CarwashServiceRegistryForm,
    actions: { resetForm: () => void; setSubmitting: (arg0: boolean) => void }
  ) => {
    try {
      await setCarwashServices(
        values.vehicleLicensePlate,
        values.serviceType,
        formatDateAndTimeISO(values.serviceDate, values.hour),
        values.notes
      );
      actions.resetForm();
      setSuccess(SERVICE_SUCCESSFULLY_CREATE);
    } catch (error) {
      const errorResponse = getFormErrorResponse(error);
      setErrorMessage(errorResponse);
      setIsError(true);
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ padding: "10px" }}
    >
      <Paper
        style={{
          padding: "20px",
          maxWidth: "500px",
          width: "100%",
          margin: "auto",
          textAlign: "center",
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Cadastro de Serviço
        </Typography>
        <Typography variant="body2" gutterBottom>
          Preencha os campos abaixo para cadastrar um novo serviço.
        </Typography>

        <Formik
          initialValues={initialValues}
          validationSchema={CarwashServiceRegistryFormValidationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <SelectField
                name="serviceType"
                label="Tipo de Serviço"
                options={serviceTypeOptions}
              />
              <InputField
                name="vehicleLicensePlate"
                label="Placa do Veículo"
                type="text"
              />
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <InputField name="hour" label="Hora do Serviço" type="time" />
                </Grid>
                <Grid item xs={12} md={6}>
                  <InputField
                    name="serviceDate"
                    label="Data do Serviço"
                    type="date"
                  />
                </Grid>
              </Grid>
              <CustomTextarea name="notes" label="Descrição" rows={3} />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isSubmitting}
                startIcon={isSubmitting && <CircularProgress size={20} />}
              >
                {isSubmitting ? "Cadastrando..." : "Cadastrar"}
              </Button>
            </Form>
          )}
        </Formik>
      </Paper>
      {success && (
        <SuccessModal message={success} onClose={() => setSuccess(null)} />
      )}
      {isError && (
        <ErrorModal
          onClose={() => {
            navigate(LOGIN_ROUTE);
            setIsError(false);
          }}
          errorMessage={errorMessage}
        />
      )}
    </Grid>
  );
};

export default CarwashServiceRegistry;
