import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ErrorModal } from "components/Dialog";
import { LOGIN_ROUTE } from "routes/ConstantsURLRoutes";
import { LOGIN_IS_REQUIRED } from "validations/messages/Authentication";
import { authProvider } from "auth/tokenService";

const isAuthenticated = () => {
  return !!authProvider();
};

interface IsAuthProps {
  children: React.ReactNode;
}

const IsAuth: React.FC<IsAuthProps> = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated()) {
    }
  }, [navigate]);

  if (!isAuthenticated()) {
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

export default IsAuth;
