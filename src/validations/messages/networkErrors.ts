export const NETWORK_ERROR = "Network Error";

export const isNetworkError = (error: any): boolean =>
  error.message.includes(NETWORK_ERROR);
