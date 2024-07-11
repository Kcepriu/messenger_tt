import { FC, useEffect } from "react";
import { useUsersStore } from "../../stores";

const ButtonAboutUser: FC = () => {
  const readUser = useUsersStore((store) => store.readUser);

  useEffect(() => {
    readUser();
  }, [readUser]);

  return <p>ButtonAboutUser</p>;
};

export { ButtonAboutUser };
