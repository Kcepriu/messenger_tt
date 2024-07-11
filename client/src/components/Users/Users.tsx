import { FC } from "react";
import { User } from "../User/User";
import { useUsersStore } from "../../stores";

const Users: FC = () => {
  const users = useUsersStore((store) => store.users);
  return (
    <ul
      className="flex flex-col gap-3
    "
    >
      {users.map((user) => (
        <li key={user.id}>
          <User user={user} />
        </li>
      ))}
    </ul>
  );
};

export { Users };
