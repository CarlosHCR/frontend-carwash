import * as Yup from "yup";

export const CarwashServiceTypeFormValidationSchema = Yup.object({
  name: Yup.string().required("O nome  do serviço é obrigatória").trim(),
  price: Yup.string()
    .required("O preço é obrigatório")
    .test("is-valid-number", "O preço deve ser um número válido", (value) => {
      const numberValue = Number(value.replace(/,/g, "."));
      return !isNaN(numberValue) && isFinite(numberValue) && numberValue > 0;
    }),
});
