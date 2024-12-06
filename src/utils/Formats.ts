import moment from "moment-timezone";

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

export const formatDateAndTimeISO = (
  serviceDate: string,
  serviceHour: string
) => {
  const moment = require("moment");
  const combinedDateTime = moment(
    `${serviceDate} ${serviceHour}`,
    "YYYY-MM-DD HH:mm"
  );
  return combinedDateTime.toISOString();
};

export const formatDateAndTime = (dateString: string) => {
  const formattedDate = moment
    .tz(dateString, "America/Sao_Paulo")
    .format("DD-MM-YYYY HH[h]");
  return formattedDate;
};

export const getURLParams = (url: string) => {
  const paramsArray = url.split("/").slice(-2);
  return {
    UID: paramsArray[0],
    TOKEN: paramsArray[1],
  };
};

export const formatPhoneNumber = (value: string): string => {
  let numbers = value.replace(/[^\d]/g, "");
  let formattedNumber = "";

  if (numbers.length > 2) {
    formattedNumber += `(${numbers.substring(0, 2)})`;
    numbers = numbers.substring(2);
  }

  if (numbers.length) {
    if (numbers.length > 5) {
      formattedNumber += ` ${numbers.substring(0, 5)}-${numbers.substring(
        5,
        9
      )}`;
    } else {
      formattedNumber += ` ${numbers.substring(0, 4)}${
        numbers.length > 4 ? "-" + numbers.substring(4) : ""
      }`;
    }
  }

  return formattedNumber;
};

export const formatDateAndTimeBR = (dateString: string) => {
  const momentDate = moment.tz(dateString, "America/Sao_Paulo");
  const date = momentDate.format("DD/MM/YYYY");
  const time = momentDate.format("HH:mm");
  return { date, time };
};
