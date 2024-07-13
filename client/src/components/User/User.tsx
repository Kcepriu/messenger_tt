import { FC } from "react";
import { useUsersStore } from "../../stores";

interface IProps {
  user: IUser;
}

const User: FC<IProps> = ({ user }) => {
  const { setCurrentUser } = useUsersStore((store) => store);
  const handleChoiceUser = () => {
    if (user.currentUser) return;
    setCurrentUser(user);
  };

  return (
    <button
      className="w-full gap-3 flex content-between p-2 border rounded-lg border-border_main
      data-[is-current=true]:bg-fill_main "
      data-is-current={user.currentUser}
      onClick={handleChoiceUser}
    >
      <p className="grow text-left">{user.name}</p>
      {user.numberUnreadMessages > 0 && <p>{user.numberUnreadMessages}</p>}
    </button>
  );
};

export { User };
