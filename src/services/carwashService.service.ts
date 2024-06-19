import { BASE_URL } from "config";
import api from "./AxiosConfig";

export const getAllServiceTypes = async () => {
  try {
    const response = await api.get("servicetypes/");
    return response.data.results;
  } catch (error) {
    throw error;
  }
};

export const setServiceType = async (
  name: string,
  price: number,
  description: string
) => {
  try {
    const response = await api.post(`servicetypes/`, {
      name,
      price,
      description,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteServiceType = async (id: number) => {
  try {
    const response = await api.delete(`servicetypes/${id}/`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateServiceType = async (
  id: number,
  name: string,
  price: number,
  description: string
) => {
  try {
    const response = await api.patch(`servicetypes/${id}/`, {
      name,
      price,
      description,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const setCarwashServices = async (
  vehicleLicensePlate: string,
  serviceType: string,
  price: number,
  serviceDate: string,
  notes: string
) => {
  try {
    const response = await api.post("carwashservice/", {
      license_plate_number: vehicleLicensePlate,
      service_type: serviceType,
      price,
      service_date: serviceDate,
      notes,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getCarwashServicesAll = async () => {
  try {
    const response = await api.get(BASE_URL + "carwashservice/");
    return response.data.results;
  } catch (error) {
    throw error;
  }
};

export const getavailableDates = async () => {
  try {
    const response = await api.post(BASE_URL + "busytimes/");
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
