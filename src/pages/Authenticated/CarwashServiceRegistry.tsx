import CarwashServiceForm from "components/CarWash/Form/CarwashServiceForm";
import React from "react";
import { setCarwashServices } from "services/carwashService.service";

const initialValues = {
  vehicleLicensePlate: "",
  serviceType: "",
  serviceDate: "",
  notes: "",
};

const CarwashServiceRegistryClient: React.FC = () => {
  const handleSubmit = async (values: any) => {
    await setCarwashServices(
      values.vehicleLicensePlate,
      values.serviceType,
      values.serviceDate,
      values.notes
    );
  };

  return (
    <CarwashServiceForm
      initialValues={initialValues}
      includeDateTime={false}
      includeAvailableDates={true}
      onSubmit={handleSubmit}
    />
  );
};

export default CarwashServiceRegistryClient;
