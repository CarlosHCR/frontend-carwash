import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ErrorModal } from "components/Dialog";
import { LOGIN_ROUTE } from "routes/ConstantsURLRoutes";
import { LOGIN_IS_REQUIRED } from "validations/messages/Authentication";
import { authProvider, isUserRoleStaff } from "auth/tokenService";

const isAuthenticatedAndStaff = () => {
  return !!authProvider() && isUserRoleStaff();
};

interface IsStaffProps {
  children: React.ReactNode;
}

const IsStaff: React.FC<IsStaffProps> = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticatedAndStaff()) {
    }
  }, [navigate]);

  if (!isAuthenticatedAndStaff()) {
    return (
      <ErrorModal
        errorMessage={LOGIN_IS_REQUIRED}
        onClose={() => {
          navigate(LOGIN_ROUTE);
        }}
      />
    );
  }

  return <>{children}</>;
};

export default IsStaff;
