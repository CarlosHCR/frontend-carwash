import CarwashServiceForm from "components/CarWash/Form/CarwashServiceForm";
import React from "react";
import { setCarwashServices } from "services/carwashService.service";
import { formatDateAndTimeISO } from "utils";

const initialValues = {
  vehicleLicensePlate: "",
  serviceType: "",
  serviceDate: "",
  hour: "",
  notes: "",
};

const CarwashServiceRegistryAdmin: React.FC = () => {
  const handleSubmit = async (values: any) => {
    await setCarwashServices(
      values.vehicleLicensePlate,
      values.serviceType,
      formatDateAndTimeISO(values.serviceDate, values.hour),
      values.notes
    );
  };

  return (
    <CarwashServiceForm
      initialValues={initialValues}
      includeDateTime={true}
      includeAvailableDates={false}
      onSubmit={handleSubmit}
    />
  );
};

export default CarwashServiceRegistryAdmin;
