export const months = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

export const formatToBRL = (value: number) => {
  if (value === undefined) {
    return undefined;
  }
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return `${date.getDate().toString().padStart(2, "0")}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${date.getFullYear()}`;
};
export const formatDateAndTimeISO = (serviceDate: string, serviceHour: string) => {
  const moment = require("moment");
  const combinedDateTime = moment(
    `${serviceDate} ${serviceHour}`,
    "YYYY-MM-DD HH:mm"
  );
  return combinedDateTime.toISOString();
};

export const formatDateAndTime = (dateString: string) => {
  const date = new Date(dateString);
  return `${date.getDate().toString().padStart(2, "0")}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${date.getFullYear()} ${date
    .getHours()
    .toString()
    .padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;
};

export const getURLParams = (url: string) => {
  const paramsArray = url.split("/").slice(-2);
  return {
    UID: paramsArray[0],
    TOKEN: paramsArray[1],
  };
};
