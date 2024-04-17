import * as Yup from "yup";

export const CarwashServiceRegistryFormValidationSchema = Yup.object({
  vehicleLicensePlate: Yup.string()
    .required("A placa do veículo é obrigatória")
    .trim(),
  serviceType: Yup.string().required("O tipo de serviço é obrigatório").trim(),
  // price: Yup.string()
  //   .required("O preço é obrigatório")
  //   .test("is-valid-number", "O preço deve ser um número válido", (value) => {
  //     const numberValue = Number(value.replace(/,/g, "."));
  //     return !isNaN(numberValue) && isFinite(numberValue) && numberValue > 0;
  //   }),
  serviceDate: Yup.date().required("A data do serviço é obrigatória"),
  notes: Yup.string().trim(),
  hour: Yup.string().required("O horário é obrigatório"),
});
