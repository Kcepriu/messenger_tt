import { FC } from "react";
import { MessageNotMy } from "../MessageNotMy/MessageNotMy";
import { MessageMy } from "../MessageMy/MessageMy";
import { useChatsStore, useUsersStore } from "../../stores";
import { MainLoader } from "../MainLoader/MainLoader";

const Chats: FC = () => {
  const { chats, isLoading } = useChatsStore((store) => store);
  const currentUser = useUsersStore((store) => store.currentUser);

  if (!currentUser) return null;
  if (isLoading) return <MainLoader />;

  return (
    <ul className="flex flex-col gap-4">
      {chats.map((chat) => {
        return (
          <li key={chat.id}>
            {chat.recipient === currentUser.id ? (
              <MessageMy chat={chat} />
            ) : (
              <MessageNotMy chat={chat} />
            )}
          </li>
        );
      })}
    </ul>
  );
};

export { Chats };
