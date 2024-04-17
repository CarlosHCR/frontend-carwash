import { BASE_URL } from "config";
import axios from "axios";
import {
  setUserSessionStorage,
  clearUserSessionStorage,
  getAccessToken,
  getRefreshToken,
} from "auth/tokenService";

const authApi = axios.create({
  baseURL: BASE_URL,
});

export const register = async (
  username: string,
  email: string,
  password1: string,
  password2: string,
  firstName: string,
  lastName: string,
  phoneNumber: string
) => {
  try {
    const response = await authApi.post("register", {
      username,
      email,
      password1,
      password2,
      first_name: firstName,
      last_name: lastName,
      phone_number: phoneNumber,
    });
    return response.data;
  } catch (error: any) {
    throw error;
  }
};

export const confirmEmail = async (key: string) => {
  try {
    const response = await authApi.post(`account-confirm-email/${key}/`, {
      key,
    });
    return response.data;
  } catch (error: any) {
    throw error;
  }
};

export const resendEmail = async (email: string) => {
  try {
    const response = await authApi.post("resend-email", {
      email,
    });
    return response.data;
  } catch (error: any) {
    throw error;
  }
};

export const login = async (username: string, password: string) => {
  try {
    const response = await authApi.post("login", {
      username,
      password,
    });
    setUserSessionStorage(response.data);
    return response.data;
  } catch (error: any) {
    throw error;
  }
};

export const resetPassword = async (email: string) => {
  try {
    const response = await authApi.post(`password/reset`, {
      email,
    });
    return response.data;
  } catch (error: any) {
    throw error;
  }
};

export const confirmPasswordReset = async (
  uid: string,
  token: string,
  newPassword: string,
  newPassword2: string
) => {
  try {
    const response = await authApi.post(
      `password/reset/confirm/${uid}/${token}`,
      {
        uid,
        token,
        new_password1: newPassword,
        new_password2: newPassword2,
      }
    );
    return response.data;
  } catch (error: any) {
    throw error;
  }
};

export const refreshToken = async () => {
  const refreshToken = getRefreshToken();
  try {
    const response = await authApi.post("token/refresh", {
      refresh: refreshToken,
    });
    sessionStorage.setItem("accessToken", response.data.access);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const validationToken = async () => {
  const accessToken = getAccessToken();
  try {
    const response = await authApi.post("token/verify", {
      token: accessToken,
    });
    return response;
  } catch (error: any) {
    throw error;
  }
};

export const logout = () => {
  clearUserSessionStorage();
};

export const isAuthenticated = async () => {
  try {
    await validationToken();
    return true;
  } catch (error: any) {
    if (error.message.includes("401")) {
      try {
        await refreshToken();
        return true;
      } catch (refreshError) {
        throw error;
      }
    } else {
      throw error;
    }
  }
};
