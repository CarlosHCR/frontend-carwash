import React, { useEffect, useState } from "react";
import { Button, CircularProgress, Typography } from "@mui/material";
import { Formik, Form } from "formik";
import InputField from "components/CarWash/Fields/InputField";
import SelectField from "components/CarWash/Fields/SelectField";
import CustomTextarea from "components/CarWash/Fields/CustomTextarea";
import { CarwashServiceRegistryFormValidationSchema } from "validations/forms/CarWash";
import {
  getAllServiceTypes,
  getavailableDates,
  setCarwashServices,
} from "services/carwashService.service";
import { ErrorModal, SuccessModal } from "components/Dialog/";
import {
  SERVICE_SUCCESSFULLY_CREATE,
  getFormErrorResponse,
} from "validations/messages/CarWash";
import SelectFieldDate from "components/CarWash/Fields/SelectFieldDate";
import PageContainer from "components/CarWash/PageContainer/PageContainer";

interface CarwashServiceRegistryForm {
  vehicleLicensePlate: string;
  serviceType: string;
  price: number;
  serviceDate: string;
  notes: string;
}

const initialValues: CarwashServiceRegistryForm = {
  vehicleLicensePlate: "",
  serviceType: "",
  price: 0,
  serviceDate: "",
  notes: "",
};

const CarwashServiceRegistry: React.FC = () => {
  const [serviceTypeOptions, setServiceTypeOptions] = useState<any[]>([]);
  const [availableDates, setAvailableDates] = useState<string[]>([]);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = React.useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resultGetServiceTypes = await getAllServiceTypes();
        setServiceTypeOptions(resultGetServiceTypes);

        const resultGetAvailableDates = await getavailableDates();
        setAvailableDates(resultGetAvailableDates);
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
        values.price,
        values.serviceDate,
        values.notes
      );

      const updatedDates = availableDates.filter(
        (date) => date !== values.serviceDate
      );
      setAvailableDates(updatedDates);

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
    <>
      <PageContainer>
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
              <SelectFieldDate
                name="serviceDate"
                label="Selecione uma data"
                options={availableDates}
              />
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
      </PageContainer>
      {success && (
        <SuccessModal message={success} onClose={() => setSuccess(null)} />
      )}
      {isError && (
        <ErrorModal
          onClose={() => {
            setIsError(false);
          }}
          errorMessage={errorMessage}
        />
      )}
    </>
  );
};

export default CarwashServiceRegistry;
