import { FC } from "react";
import { MessageNotMy } from "../MessageNotMy/MessageNotMy";
import { MessageMy } from "../MessageMy/MessageMy";
import { useChatsStore } from "../../stores/chats.store";

const currentUser = {
  id: 1,
};

const Chats: FC = () => {
  const { chats } = useChatsStore((store) => store);
  return (
    <ul className="flex flex-col gap-4">
      {chats.map((chat) => {
        return (
          <li key={chat.id}>
            {chat.owner === currentUser.id ? (
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
