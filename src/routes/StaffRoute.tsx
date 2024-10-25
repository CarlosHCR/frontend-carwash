import React from "react";
import { Route, Routes } from "react-router-dom";
import StaffHome from "pages/Admin/StaffHome";

import {
  HOME_ROUTE,
  SERVICES_TYPE_CREATE_ROUTE,
  SERVICES_CREATE_ROUTE,
} from "routes/ConstantsURLRoutes";
import IsStaff from "hooks/IsStaff";
import CarwashServiceSericeType from "pages/Admin/CarWashServiceType";
import CarwashServiceRegistry from "pages/Admin/CarWashServiceRegistry";

const StaffRoute: React.FC = () => {
  return (
    <Routes>
      <Route
        path={HOME_ROUTE}
        element={
          <IsStaff>
            <StaffHome />
          </IsStaff>
        }
      />
      <Route
        path={SERVICES_TYPE_CREATE_ROUTE}
        element={
          <IsStaff>
            <CarwashServiceSericeType />
          </IsStaff>
        }
      />
      <Route
        path={SERVICES_CREATE_ROUTE}
        element={
          <IsStaff>
            <CarwashServiceRegistry />
          </IsStaff>
        }
      />
    </Routes>
  );
};

export default StaffRoute;
