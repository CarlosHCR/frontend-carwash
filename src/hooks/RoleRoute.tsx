import {
  authProvider,
  isUserRoleStaff,
  isUserRoleClient,
} from "auth/tokenService";
import { AUTHENTICATION_ERROR_MESSAGE } from "validations/messages/Authentication";
import { HOME_ROUTE, STAFF_HOME_ROUTE } from "routes/ConstantsURLRoutes";

export const RoleRoute = () => {
  try {
    const isAuthenticated = authProvider();

    if (!isAuthenticated) {
      throw new Error(AUTHENTICATION_ERROR_MESSAGE);
    }

    const isStaff = isUserRoleStaff();

    if (isStaff) {
      return STAFF_HOME_ROUTE;
    }

    const isUser = isUserRoleClient();

    if (isUser) {
      return HOME_ROUTE;
    }

    throw new Error(AUTHENTICATION_ERROR_MESSAGE);
  } catch (error) {
    throw error;
  }
};
