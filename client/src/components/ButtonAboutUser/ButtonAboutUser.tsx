import { FC } from "react";
import { IoPersonSharp } from "react-icons/io5";
import { useAuthStore } from "../../stores";

const ButtonAboutUser: FC = () => {
  const { logOut, user } = useAuthStore((store) => store);

  const handlerLogOut = async () => {
    await logOut();
  };

  return (
    <div className="flex gap-4 items-center">
      <div className="p-2 w-fit border border-border_main rounded-full ">
        <IoPersonSharp size={48} />
      </div>
      <div>
        <h2 className="font-bold text-2xl">{user?.name}</h2>
        <button onClick={handlerLogOut}> Log Out</button>
      </div>
    </div>
  );
};

export { ButtonAboutUser };
