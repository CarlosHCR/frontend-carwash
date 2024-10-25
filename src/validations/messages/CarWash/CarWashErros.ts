import { SERVER_ERROR } from "../ConstantsErrorMessage";
import { isNetworkError } from "../networkErrors";
import {
  ERROR_VEHICLE_LICENSE_PLATE,
  ERROR_SERVICE_TYPE,
  ERROR_SERVICE_DATE,
  ERROR_PRICE,
  ERROR_UNKNOWN,
  ERROR_SERVICES_NOT_FOUND,
  ERROR_DATE_INVALID,
} from "./CarWashErrorMessages";

export const getFormErrorResponse = (error: any): string => {
  if (isNetworkError(error)) return SERVER_ERROR;

  let errorMessages = [];

  if (error.response?.data?.vehicle_license_plate_name) {
    errorMessages.push(ERROR_VEHICLE_LICENSE_PLATE);
  }
  if (error.response?.data?.service_type_data) {
    errorMessages.push(ERROR_SERVICE_TYPE);
  }
  if (error.response?.data?.service_date) {
    errorMessages.push(ERROR_SERVICE_DATE);
  }
  if (error.response?.data?.price) {
    errorMessages.push(ERROR_PRICE);
  }

  if (error.response.data?.non_field_errors) {
    if (
      error.response.data.non_field_errors[0] ===
      "The date needs to be valid. The service must be scheduled for the future."
    ) {
      errorMessages.push(ERROR_DATE_INVALID);
    }
  }

  if (errorMessages.length === 0) {
    return ERROR_UNKNOWN;
  }

  return errorMessages.join("\n");
};

export const getListServiceResponse = (error: any): string => {
  if (isNetworkError(error)) return SERVER_ERROR;

  return ERROR_SERVICES_NOT_FOUND;
};
