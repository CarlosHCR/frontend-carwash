import { logout, refreshToken } from "auth/authService";
import { getAccessToken } from "auth/tokenService";
import axios, {
  AxiosRequestConfig,
  AxiosRequestHeaders,
  AxiosResponse,
} from "axios";
import ForceLogoutDialog from "components/Dialog/ForceLogout";
import { BASE_URL } from "config";
import { AUTHENTICATION_ERROR_MESSAGE } from "validations/messages/Authentication";

const redirectToLogin = () => {
  logout();
  ForceLogoutDialog(AUTHENTICATION_ERROR_MESSAGE);
};

const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use(async (config) => {
  try {
    const accessToken = getAccessToken();
    if (accessToken) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${accessToken}`,
      } as AxiosRequestHeaders;
    }
    return config;
  } catch (error) {
    throw error;
  }
});

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };

    if (error.response?.status === 403) {
      redirectToLogin();
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await refreshToken();
        const accessToken = getAccessToken();
        if (accessToken) {
          return api({
            ...originalRequest,
            headers: {
              ...originalRequest.headers,
              Authorization: `Bearer ${accessToken}`,
            },
          });
        }
      } catch (refreshError) {
        redirectToLogin();
      }
    }
    return Promise.reject(error);
  }
);

export default api;
