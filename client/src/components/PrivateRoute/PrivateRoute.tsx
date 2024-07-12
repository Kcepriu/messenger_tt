import { FC } from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../../stores";

import { APP_KEYS } from "../../constants";

interface IParam {
  component: FC;
  redirectTo?: string;
}

const PrivateRoute: FC<IParam> = ({
  component: Component,
  redirectTo = APP_KEYS.ROUTER_KEYS.LOGIN,
}) => {
  const { isLoggedIn } = useAuthStore((store) => store);
  return isLoggedIn ? <Component /> : <Navigate to={redirectTo} />;
};

export { PrivateRoute };
