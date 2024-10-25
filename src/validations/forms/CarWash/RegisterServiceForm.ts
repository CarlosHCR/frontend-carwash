import * as Yup from "yup";

export const CarwashServiceRegistryFormValidationSchema = () =>
  Yup.object({
    vehicleLicensePlate: Yup.string()
      .required("A placa do veículo é obrigatória")
      .trim(),
    serviceType: Yup.string()
      .required("O tipo de serviço é obrigatório")
      .trim(),
    serviceDate: Yup.date().required("A data do serviço é obrigatória"),
    notes: Yup.string().trim(),
  });

export const CarwashServiceRegistryStaffFormValidationSchema = () =>
  Yup.object({
    ...CarwashServiceRegistryFormValidationSchema().fields,
    hour: Yup.string()
      .required("A hora do serviço é obrigatória")
      .matches(/^([01]\d|2[0-3]):([0-5]\d)$/, "Hora inválida"),
  });
