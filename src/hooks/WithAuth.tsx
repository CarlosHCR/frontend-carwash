import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ErrorModal } from "components/Dialog";
import { getAccessToken, getRefreshToken } from "auth/tokenService";
import { LOGIN_ROUTE } from "routes/ConstantsURLRoutes";
import { LOGIN_IS_REQUIRED } from "validations/messages/Authentication";

const isAuthenticated = () => {
  return !!getAccessToken() || !!getRefreshToken();
};

interface WithAuthProps {
  children: React.ReactNode;
}

const WithAuth: React.FC<WithAuthProps> = ({ children }) => {
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

export default WithAuth;
