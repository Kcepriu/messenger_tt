import { FC } from "react";
import { MessageNotMy } from "../MessageNotMy/MessageNotMy";
import { MessageMy } from "../MessageMy/MessageMy";
import { useChatsStore, useUsersStore } from "../../stores";

const Chats: FC = () => {
  const { chats } = useChatsStore((store) => store);
  const currentUser = useUsersStore((store) => store.currentUser);

  if (!currentUser) return null;

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
