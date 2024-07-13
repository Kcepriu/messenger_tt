import { FC } from "react";
import { Routes, Route } from "react-router-dom";
import { APP_KEYS } from "../constants";
import { PrivateRoute } from "../components/PrivateRoute/PrivateRoute";
import { RestrictedRoute } from "../components/RestrictedRoute/RestrictedRoute";
import { Messenger } from "../pages/Messenger";
import { LoginPage } from "../pages/LoginPage";
import { RegistrationPage } from "../pages/RegistrationPage";
import { MainLoader } from "../components/MainLoader/MainLoader";
import { useAuthStore } from "../stores";

const MainRouter: FC = () => {
  const isLoading = useAuthStore((store) => store.isLoading);

  if (isLoading) return <MainLoader />;

  return (
    <Routes>
      <Route
        path={APP_KEYS.ROUTER_KEYS.ROOT}
        element={<PrivateRoute component={Messenger} />}
      />
      <Route
        path={APP_KEYS.ROUTER_KEYS.LOGIN}
        element={<RestrictedRoute component={LoginPage} />}
      />
      <Route
        path={APP_KEYS.ROUTER_KEYS.REGISTRATION}
        element={<RestrictedRoute component={RegistrationPage} />}
      />

      <Route path="*" element={<PrivateRoute component={Messenger} />} />
    </Routes>
  );
};

export { MainRouter };
