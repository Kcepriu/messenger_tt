import { FC, useEffect } from "react";
import { MainRouter } from "./navigation/MainRouter";
import { useAuthStore } from "./stores";

const App: FC = () => {
  const autoLogIn = useAuthStore((store) => store.autoLogIn);

  useEffect(() => {
    const startLogIn = async () => {
      await autoLogIn();
    };

    startLogIn();
  }, [autoLogIn]);

  return <MainRouter />;
};

export default App;
