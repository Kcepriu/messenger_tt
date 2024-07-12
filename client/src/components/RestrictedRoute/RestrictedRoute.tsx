import { FC } from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../../stores";

import { APP_KEYS } from "../../constants";

interface IParam {
  component: FC;
  redirectTo?: string;
}

const RestrictedRoute: FC<IParam> = ({
  component: Component,
  redirectTo = APP_KEYS.ROUTER_KEYS.ROOT,
}: IParam) => {
  const { isLoggedIn } = useAuthStore((store) => store);

  return isLoggedIn ? <Navigate to={redirectTo} /> : <Component />;
};

export { RestrictedRoute };
