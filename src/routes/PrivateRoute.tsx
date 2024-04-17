import React from "react";
import { Route, Routes } from "react-router-dom";
import { LayoutNavBar } from "components/NavBar";
import Home from "pages/Home";
import RegisterService from "pages/CarwashServiceRegistry";
import ListCarwashService from "pages/ListCarwashService";
import {
  HOME_ROUTE,
  SERVICES_CREATE_ROUTE,
  SERVICES_GET_ROUTE,
  SERVICES_TYPE_CREATE,
} from "routes/ConstantsURLRoutes";
import WithAuth from "hooks/WithAuth";
import CarwashServiceSericeType from "pages/CarWashServiceType";

const PrivateRoute: React.FC = () => {
  return (
    <LayoutNavBar>
      <Routes>
        <Route
          path={HOME_ROUTE}
          element={
            <WithAuth>
              <Home />
            </WithAuth>
          }
        />
        <Route
          path={SERVICES_CREATE_ROUTE}
          element={
            <WithAuth>
              <RegisterService />
            </WithAuth>
          }
        />
        <Route
          path={SERVICES_GET_ROUTE}
          element={
            <WithAuth>
              <ListCarwashService />
            </WithAuth>
          }
        />
        <Route
          path={SERVICES_TYPE_CREATE}
          element={
            <WithAuth>
              <CarwashServiceSericeType />
            </WithAuth>
          }
        />
      </Routes>
    </LayoutNavBar>
  );
};

export default PrivateRoute;
