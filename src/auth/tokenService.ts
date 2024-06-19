interface Token {
  user: any;
  access: string;
  refresh: string;
}

export const setUserSessionStorage = ({ user, access, refresh }: Token) => {
  sessionStorage.setItem("user", JSON.stringify(user));
  sessionStorage.setItem("accessToken", access);
  sessionStorage.setItem("refreshToken", refresh);
};

export const clearUserSessionStorage = () => {
  sessionStorage.removeItem("user");
  sessionStorage.removeItem("accessToken");
  sessionStorage.removeItem("refreshToken");
};

export const getAccessToken = () => {
  return sessionStorage.getItem("accessToken");
};

export const getRefreshToken = () => {
  return sessionStorage.getItem("refreshToken");
};

export const isUserRoleStaff = () => {
  const userString = sessionStorage.getItem("user");
  const user = userString && JSON.parse(userString);
  return !!user && (user.role === "staff" || user.role === "admin");
};

export const isUserRoleClient = () => {
  const userString = sessionStorage.getItem("user");
  const user = userString && JSON.parse(userString);
  return !!user && user.role === "client";
};

export const authProvider = () => {
  return !!getAccessToken() || !!getRefreshToken;
};
