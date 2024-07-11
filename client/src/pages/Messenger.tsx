import { FC } from "react";
import { Chats } from "../components/Chats/Chats";
import { EditMessage } from "../components/EditMessage/EditMessage";
import { Users } from "../components/Users/Users";
import { ButtonAboutUser } from "../components/ButtonAboutUser/ButtonAboutUser";

const Messenger: FC = () => {
  return (
    <div className="px-40 py-8 w-full h-dvh flex gap-8">
      <div className="w-[300px] h-full flex flex-col ">
        <ButtonAboutUser />
        <Users />
      </div>

      <div className="w-full h-full flex flex-col px-6 outline outline-1 outline-green-400">
        <div className="grow">
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
