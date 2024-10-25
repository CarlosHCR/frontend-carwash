import React, { useEffect, useState } from "react";
import { Button, CircularProgress, Grid, Typography } from "@mui/material";
import { Formik, Form } from "formik";
import InputField from "components/CarWash/Fields/InputField";
import SelectField from "components/CarWash/Fields/SelectField";
import CustomTextarea from "components/CarWash/Fields/CustomTextarea";
import SelectFieldDate from "components/CarWash/Fields/SelectFieldDate";
import { CarwashServiceRegistryFormValidationSchema } from "validations/forms/CarWash";
import {
  getAllServiceTypes,
  getavailableDates,
} from "services/carwashService.service";
import { ErrorModal, SuccessModal } from "components/Dialog/";
import PageContainer from "components/CarWash/PageContainer/PageContainer";
import {
  getFormErrorResponse,
  SERVICE_SUCCESSFULLY_CREATE,
} from "validations/messages/CarWash";
import { CarwashServiceRegistryStaffFormValidationSchema } from "validations/forms/CarWash/RegisterServiceForm";

interface CarwashServiceFormProps {
  initialValues: any;
  includeDateTime: boolean;
  includeAvailableDates: boolean;
  onSubmit: (values: any) => Promise<void>;
}

const CarwashServiceForm: React.FC<CarwashServiceFormProps> = ({
  initialValues,
  includeDateTime,
  includeAvailableDates,
  onSubmit,
}) => {
  const [serviceTypeOptions, setServiceTypeOptions] = useState<any[]>([]);
  const [availableDates, setAvailableDates] = useState<string[]>([]);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resultGetServiceTypes = await getAllServiceTypes();
        setServiceTypeOptions(resultGetServiceTypes);

        if (includeAvailableDates) {
          const resultGetAvailableDates = await getavailableDates();
          setAvailableDates(resultGetAvailableDates);
        }
      } catch (error: any) {
        console.log(error);
      }
    };
    fetchData();
  }, [includeAvailableDates]);

  const handleSubmit = async (values: any, actions: any) => {
    try {
      await onSubmit(values);

      if (includeAvailableDates) {
        const updatedDates = availableDates.filter(
          (date) => date !== values.serviceDate
        );
        setAvailableDates(updatedDates);
      }

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
          validationSchema={
            includeDateTime
            ? CarwashServiceRegistryStaffFormValidationSchema()
            : CarwashServiceRegistryFormValidationSchema()
          }
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

              {includeDateTime ? (
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <InputField
                      name="hour"
                      label="Hora do Serviço"
                      type="time"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <InputField
                      name="serviceDate"
                      label="Data do Serviço"
                      type="date"
                    />
                  </Grid>
                </Grid>
              ) : (
                includeAvailableDates && (
                  <SelectFieldDate
                    name="serviceDate"
                    label="Selecione uma data"
                    options={availableDates}
                  />
                )
              )}

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
          onClose={() => setIsError(false)}
          errorMessage={errorMessage}
        />
      )}
    </>
  );
};

export default CarwashServiceForm;
