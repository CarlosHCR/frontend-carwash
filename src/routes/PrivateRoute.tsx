import React from "react";
import { Route, Routes } from "react-router-dom";
import {
  HOME_ROUTE,
  SERVICES_CREATE_ROUTE,
  SERVICES_GET_ROUTE,
} from "routes/ConstantsURLRoutes";
import ClientHome from "pages/Authenticated/ClientHome";
import IsAuth from "hooks/IsAuth";
import RegisterService from "pages/Authenticated/CarwashServiceRegistry";
import ListCarwashService from "pages/Authenticated/ListCarwashService";

const PrivateRoute: React.FC = () => {
  return (
    <Routes>
      <Route
        path={HOME_ROUTE}
        element={
          <IsAuth>
            <ClientHome />
          </IsAuth>
        }
      />
      <Route
        path={SERVICES_CREATE_ROUTE}
        element={
          <IsAuth>
            <RegisterService />
          </IsAuth>
        }
      />
      <Route
        path={SERVICES_GET_ROUTE}
        element={
          <IsAuth>
            <ListCarwashService />
          </IsAuth>
        }
      />
    </Routes>
  );
};

export default PrivateRoute;
