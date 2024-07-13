import { FC, useEffect } from "react";
import { Chats } from "../components/Chats/Chats";
import { EditMessage } from "../components/EditMessage/EditMessage";
import { Users } from "../components/Users/Users";
import { ButtonAboutUser } from "../components/ButtonAboutUser/ButtonAboutUser";
import { useUsersStore } from "../stores";

const Messenger: FC = () => {
  const readUsers = useUsersStore((store) => store.readUsers);

  useEffect(() => {
    const startReadUsers = async () => {
      readUsers();
    };

    startReadUsers();
  }, [readUsers]);

  return (
    <div className="px-40 py-8 w-full h-dvh flex gap-8">
      <div className="w-[300px] h-full flex flex-col  gap-4">
        <ButtonAboutUser />
        <Users />
      </div>

      <div className="w-full h-full flex flex-col px-6 ">
        <div className="grow overflow-y-auto">
          <Chats />
        </div>

        <div className="min-h-[300px]">
          <EditMessage />
        </div>
      </div>
    </div>
  );
};

export { Messenger };
