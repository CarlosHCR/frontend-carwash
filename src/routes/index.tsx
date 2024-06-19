import { Route, Routes } from "react-router-dom";
import {
  CONFIRM_EMAIL_ROUTE,
  LOGIN_ROUTE,
  REGISTER_ROUTE,
  RESET_PASSWORD_ROUTE,
} from "./ConstantsURLRoutes";
import React, { Suspense } from "react";
import LoadingPage from "components/LoadingPage";
import { LayoutNavBar } from "components/NavBar";

const Register = React.lazy(() => import("pages/Register"));
const Login = React.lazy(() => import("pages/Login"));
const ConfirmEmail = React.lazy(() => import("pages/ConfirmEmail"));
const ConfirmResetPassword = React.lazy(
  () => import("pages/ConfirmResetPassword")
);
const StaffRoute = React.lazy(() => import("./StaffRoute"));
const PrivateRoute = React.lazy(() => import("./PrivateRoute"));

export const AppRoutes = () => {
  return (
    <Suspense fallback={<LoadingPage />}>
      <Routes>
        <Route path={REGISTER_ROUTE} element={<Register />} />
        <Route path={LOGIN_ROUTE} element={<Login />} />
        <Route path={CONFIRM_EMAIL_ROUTE} element={<ConfirmEmail />} />
        <Route path={RESET_PASSWORD_ROUTE} element={<ConfirmResetPassword />} />
        <Route
          path="/*"
          element={
            <LayoutNavBar>
              <PrivateRoute />
            </LayoutNavBar>
          }
        />
        <Route
          path="staff/*"
          element={
            <LayoutNavBar>
              <StaffRoute />
            </LayoutNavBar>
          }
        />
      </Routes>
    </Suspense>
  );
};
